package za.co.reverside.manage;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableAutoConfiguration
@ComponentScan
@EnableJpaRepositories
@ImportResource("classpath:security-context.xml")
public class Application {

    public static void main(String[] args) {
        new SpringApplication(Application.class).run(args);
    }
}
