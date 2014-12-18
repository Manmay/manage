package za.co.reverside.manage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.bind.annotation.ControllerAdvice;

@EnableAutoConfiguration
@ComponentScan
//@ImportResource("classpath:application-context.xml")
public class Application {

    public static void main(String[] args) {
        new SpringApplication(Application.class).run(args);
    }
}
