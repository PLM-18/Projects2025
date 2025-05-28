package com.encrypt.AES;

import javax.crypto.SecretKey;

public class AES {
    SecretKey key;
    String algorithm = "AES";
    private int KEY_SIZE = 256;

    public void initializeKey() {
        try {
            javax.crypto.KeyGenerator keyGen = javax.crypto.KeyGenerator.getInstance(algorithm);
            keyGen.init(KEY_SIZE);
            key = keyGen.generateKey();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String encrypt(String data) {
        try {
            javax.crypto.Cipher cipher = javax.crypto.Cipher.getInstance(algorithm+ "/ECB/PKCS5Padding");
            cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key);
            byte[] encryptedData = cipher.doFinal(data.getBytes());
            return java.util.Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public byte[] decrypt(String encryptedData) {
        try {
            javax.crypto.Cipher cipher = javax.crypto.Cipher.getInstance(algorithm + "/ECB/PKCS5Padding");
            cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key);
            byte[] decodedData = java.util.Base64.getDecoder().decode(encryptedData);
            return cipher.doFinal(decodedData);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
