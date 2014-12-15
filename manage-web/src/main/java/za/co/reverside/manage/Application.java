package za.co.reverside.manage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@EnableAutoConfiguration
public class Application {

    public static void main(String[] args) {
        new SpringApplication(Application.class).run(args);
    }
}
