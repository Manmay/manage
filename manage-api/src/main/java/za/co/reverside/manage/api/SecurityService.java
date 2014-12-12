package za.co.reverside.manage.api;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import za.co.reverside.manage.model.domain.Employee;
import za.co.reverside.manage.model.domain.Login;
import za.co.reverside.manage.model.google.GoogleUser;
import za.co.reverside.manage.repository.EmployeeRepository;
import za.co.reverside.manage.repository.GoogleUserRepository;
import za.co.reverside.manage.repository.LoginRepository;


@RestController
public class SecurityService {
	
	@Autowired
	GoogleUserRepository googleUserRepository;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	LoginRepository loginRepository;

	@RequestMapping(value="login", method= GET)
	public String login(@RequestParam("token") String securityToken){
		GoogleUser googleUser = googleUserRepository.findByAccessToken(securityToken);
		Login login = loginRepository.findByUserName(googleUser.getEmail());
		if(login == null){
			Employee employee = new Employee(googleUser);
			employeeRepository.save(employee);
			login = new Login(googleUser.getEmail(), securityToken);
			loginRepository.save(login);
		} else {
			login.setPassword(securityToken);
			loginRepository.save(login);
		}
		return login.getUserName();
	}
	
	@RequestMapping(value="logout", method= GET)
	public void logout(String securityToken){
		
	}
}
