package com.encrypt.encrypt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.encrypt.AES.AES;

@SpringBootApplication
public class EncryptApplication {

	public static void main(String[] args) {
		SpringApplication.run(EncryptApplication.class, args);

		AES aes = new AES();
		aes.initializeKey();
		String data = "Hello, World!";
		String encryptedData = aes.encrypt(data);
		System.out.println("Encrypted Data: " + encryptedData);
		byte[] decryptedData = aes.decrypt(encryptedData);
		if (decryptedData != null) {
			System.out.println("Decrypted Data: " + new String(decryptedData));
		} else {
			System.out.println("Decryption failed.");
		}
		System.out.println("Encryption and Decryption completed successfully.");
	}

}
