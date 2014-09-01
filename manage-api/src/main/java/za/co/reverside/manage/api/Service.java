package za.co.reverside.manage.api;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import za.co.reverside.manage.model.Employee;

import java.util.Date;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class Service {

    @RequestMapping(value = "api/time", method = GET)
    public String getTime(){
        return new Date().toString();
    }

    @RequestMapping(value = "api/employee/{id}", method = RequestMethod.GET)
    public Employee getEmployee(@PathVariable("id") Long id){
        Employee employee = new Employee();
        employee.setId(id);
        employee.setName("Pragati Kumar Prusty");
        employee.setEmail("pragat.prusty@reverside.co.za");
        employee.setDesignation(" Consultant");
        employee.setImgUrl("D:/image");
        employee.setPhoneNumber(846860904);
        employee.setUrls("fb/pragati/prusty.123");
        return employee;
    }


}
