package za.co.reverside.manage;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication
@ImportResource(value={"classpath:security.xml"})
public class Application {

    public static void main(String[] args) {
        new SpringApplication(Application.class).run(args);
    }
}
