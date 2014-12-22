package za.co.reverside.manage.api;


import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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
    
    @RequestMapping(value = "api/employees/me", method = RequestMethod.GET, produces = "application/json")
    public Employee me(Principal principal){
    	String employeeEmail = principal.getName();
        System.out.println(employeeEmail+">>>>>>>>");
        return employeeRepository.findByEmail(employeeEmail);
    }
    
  /*  @RequestMapping(value = "api/employees/me", method = RequestMethod.OPTIONS)
    public ResponseEntity<String> allowCrossOrigin(){
    	System.out.println("Allow Cross Origin");
    	MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("Access-Control-Allow-Origin", "*");
		return new ResponseEntity<String>(headers, HttpStatus.OK);
    }*/


}
