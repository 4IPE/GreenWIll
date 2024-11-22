package ru.GreenWill.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "ru.GreenWill.server")
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}