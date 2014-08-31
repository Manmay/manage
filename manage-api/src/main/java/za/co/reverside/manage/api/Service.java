package za.co.reverside.manage.api;


import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @RequestMapping(value = "api/employee/{id}", method = GET)
    public Employee getEmployee(@PathVariable("id") Long id){
        Employee employee = new Employee();
        employee.setId(id);
        employee.setFirstName("Manmay");
        employee.setLastName("Mohanty");
        employee.setEmail("manmay.mohanty@reverside.co.za");
        return employee;
    }

}
