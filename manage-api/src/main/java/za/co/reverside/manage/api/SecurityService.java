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
import za.co.reverside.manage.service.GoogleAuthService;
import za.co.reverside.manage.repository.LoginRepository;


@RestController
public class SecurityService {
	
	@Autowired
	GoogleAuthService googleAuthService;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	LoginRepository loginRepository;

	@RequestMapping(value="login", method= GET)
	public String login(@RequestParam("token") String securityToken){
		GoogleUser googleUser = googleAuthService.validateAccessToken(securityToken);

		Employee employee = employeeRepository.findByEmail(googleUser.getEmail());
		if(employee == null){
			employee = new Employee(googleUser);
			employeeRepository.save(employee);

		}

		Login login = loginRepository.findByUserName(googleUser.getEmail());
		if(login == null){
			login = new Login(googleUser.getEmail(), securityToken);
			loginRepository.save(login);
		}

		return login.getUserName();
	}
	
	@RequestMapping(value="logout", method= GET)
	public void logout(@RequestParam("token") String securityToken){
		Login login = loginRepository.findByPassword(securityToken);
		loginRepository.delete(login);
		googleAuthService.invalidateAccessToken(securityToken);
	}
}
