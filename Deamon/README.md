# FileSystem Watcher Daemon

- This is a daemon written in Go that monitors a specific file for access events.
- It prints a message to the console whenever the file is accessed.
- Uses **inotify** to watch for file events.

## My Experience with Go
- In Go standards, the code is **unsafe** (due to `unsafe.Pointer` usage), but hey, it works! 😉  
- I usually work in **C**, so writing this in Go was **fun and much shorter** than its C equivalent—though Go's **error handling** can be a bit tedious.  
- The **`defer` statement** is interesting; it makes resource cleanup (like closing file descriptors) much more convenient.  
- I like Go's **error handling syntax**—explicit and readable.  
- Oddly enough, **Go's variable assignment** reminds me of Pascal:  

## Pascal Example
```pascal
var
  x: integer;

begin
  x := 10;
end.
```
## Go Example
```go
package main

import "fmt"

func main() {
    var x int
    x = 10

    y := 10 //Short variable declaration

    fmt.Println(x, y)
}
```

# CHEERS🎊🎊🎉
