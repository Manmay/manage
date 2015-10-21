package za.co.reverside.manage.api;


import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

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

import za.co.reverside.manage.model.api.EmployeeQueryModel;
import za.co.reverside.manage.model.api.EmployeeCommandModel;
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
    public EmployeeQueryModel getEmployee(Principal principal){
    	String employeeEmail = principal.getName();
        Employee employee = employeeRepository.findByEmail(employeeEmail);
        EmployeeQueryModel data = new EmployeeQueryModel();
        data.setFullName(employee.getFirstName()+" "+ employee.getLastName());
        data.setEmail(employee.getEmail());
        data.setPhoto(employee.getPhoto());
        data.setGender(employee.getGender());
        data.setPhone(employee.getPhone());
        data.setLocation(employee.getLocation());
        if(employee.getDateOfBirth()!=null){
            data.setDateOfBirth(new SimpleDateFormat("dd/MM/yyyy").format(employee.getDateOfBirth()));
        }
        if(employee.getDateOfMarriage()!=null){
            data.setDateOfMarriage(new SimpleDateFormat("dd/MM/yyyy").format(employee.getDateOfMarriage()));
            data.setMaritalStatus(true);
        } else {
            data.setMaritalStatus(false);
        }
        return data;
    }

    @RequestMapping(value = "api/employees/me", method = RequestMethod.PUT, consumes = "application/json")
    public void updateEmployee(@RequestBody EmployeeCommandModel data, Principal principal) throws Exception{
        String employeeEmail = principal.getName();
        Employee employee = employeeRepository.findByEmail(employeeEmail);
        employee.setPhone(data.getPhone());
        employee.setLocation(data.getLocation());
        if(data.getDateOfBirth() != null) {
            employee.setDateOfBirth(new SimpleDateFormat("dd/MM/yyyy").parse(data.getDateOfBirth()));
        }
        if(data.getDateOfMarriage() != null){
            employee.setDateOfMarriage(new SimpleDateFormat("dd/MM/yyyy").parse(data.getDateOfMarriage()));
        }
        employeeRepository.save(employee);
    }




}
