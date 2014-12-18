package za.co.reverside.manage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@EnableAutoConfiguration
@ComponentScan
@ImportResource("classpath:application-context.xml")
public class Application {

    public static void main(String[] args) {
        new SpringApplication(Application.class).run(args);
    }
}
