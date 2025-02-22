package main

import{
	"fmt",
	"log",
	"os",
	"net/http",
	"encoding/json"
}

type Address struct{
	Street string `json:"street"`
	City string `json:"city"`
	Zip string `json:"zip"`
}

type User struct{
	ID string `json:"_id"`
	Name string `json:"name"`
	Age int `json:"age"`
	Email string `json:"email"`
	Address Address `json:"address"`
}

// Store data sends json data to the daemon
func StoreData(url string, user User) error {
	jsonData, err := json.Marshal(user)
	if err != nil {
		return fmt.Errorf("Error marshalling json data: %v", err)
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("Error posting data: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Error posting data: %v", err)
	}

	fmt.Println("Data stored successfully")
	return nil
}

func main(){
	fmt.Println("Lets get started shall we!")
}
