package main

import (
	"fmt"
	"log"
	"os"
	"golang.org/x/sys/unix"
	"unsafe"
)

const watchMask = unix.IN_CREATE | unix.IN_DELETE | unix.IN_ACCESS | unix.IN_MODIFY | unix.IN_MOVE_SELF

func main() {
	// file passed in as an argument
	if len(os.Args) < 2 {
		log.Fatalf("Usage: %s PATH\n", os.Args[0])
	}

	basepath := os.Args[1]
	fmt.Println("Daemon Application Started")

	//get the file descriptor and capture any error that occurs
	fd, err := unix.InotifyInit()
	//check if an error occurs
	if err != nil {
		log.Fatalf("Error initializing inotify: %v", err)
	}
	//close file descriptor after function call(basically freeing memory but not at the at end like C)
	defer unix.Close(fd)

	//get the watch derscriptor and f*cking error handle again bruh
	wd, err := unix.InotifyAddWatch(fd, basepath, watchMask)
	if err != nil {
		log.Fatalf("Error adding watch: %v", err)
	}
	//free memory
	defer unix.InotifyRmWatch(fd, uint32(wd))

	buf := make([]byte, unix.SizeofInotifyEvent*4096)

	// while true loop
	for{
		fmt.Println("Waiting for event...")
		n, err := unix.Read(fd, buf)
		if err != nil {
			log.Fatalf("Error reading from inotify: %v", err)
		}

		offset := 0
		for offset < n {
			// unsafe section (we don't have to free it lol)
			event := (*unix.InotifyEvent)(unsafe.Pointer(&buf[offset]))
			var msg string

			switch{
			case event.Mask&unix.IN_CREATE != 0:
				msg = "File Created"
			case event.Mask&unix.IN_DELETE != 0:
				msg = "File Deleted"
			case event.Mask&unix.IN_ACCESS != 0:
				msg = "File Accessed"
			case event.Mask&unix.IN_CLOSE_WRITE != 0:
				msg = "File Written and Closed"
			case event.Mask&unix.IN_MODIFY != 0:
				msg = "File Modified"
			case event.Mask&unix.IN_MOVE_SELF != 0:
				msg = "File Moved"
			}

			if msg != "" {
				fmt.Println(msg)
			}

			offset += unix.SizeofInotifyEvent
		}
	}
}
