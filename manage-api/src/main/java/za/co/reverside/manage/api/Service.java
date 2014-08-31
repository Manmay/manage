package za.co.reverside.manage.api;


import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class Service {


    @RequestMapping(value = "/api/time", method = RequestMethod.GET)
    public String getTime(){
        return new Date().toString();
    }

}
