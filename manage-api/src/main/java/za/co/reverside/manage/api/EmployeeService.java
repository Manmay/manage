package za.co.reverside.manage.api;


import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import za.co.reverside.manage.model.domain.Employee;
import za.co.reverside.manage.repository.EmployeeRepository;

@RestController
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @RequestMapping(value = "api/time", method = GET)
    public String getTime(){
        return new Date().toString();
    }

    @RequestMapping(value = "api/employees/{id}", method = RequestMethod.GET)
    public Employee getEmployee(@PathVariable("id") Long id){
        Employee consultant = employeeRepository.findOne(id);
        return consultant;
    }

    @RequestMapping(value = "api/employees", method = RequestMethod.GET)
    public List<Employee> getEmployee(){
        return employeeRepository.findAll();
    }

    @RequestMapping(value = "api/employees/add", method = RequestMethod.POST, consumes = "application/json")
    public void addEmployee(@RequestBody Employee consultant) {
        employeeRepository.save(consultant);
    }


}
