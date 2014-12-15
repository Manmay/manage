package za.co.reverside.manage.api;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import za.co.reverside.manage.model.domain.Employee;
import za.co.reverside.manage.model.domain.Login;
import za.co.reverside.manage.model.google.GoogleToken;
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
	public ResponseEntity<String> login(@RequestParam("code") String authorizationCode, @RequestParam("state") String requestedUrl) {		
		GoogleToken googleToken = googleAuthService.createToken(authorizationCode);		
		GoogleUser googleUser = googleAuthService.getUserInfo(googleToken.getAccessToken());		
        Employee employee = employeeRepository.findByEmail(googleUser.getEmail());		
		if(employee == null) {			
			employee = new Employee(googleUser);
			employeeRepository.save(employee);
		}
		Login login = loginRepository.findByUserName(googleUser.getEmail());		
		if(login == null){
			login = new Login(googleUser.getEmail(), googleToken.getAccessToken());
			loginRepository.save(login);
		}
		MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("Location", requestedUrl);
		headers.add("Set-Cookie", "token=mytoken");
		return new ResponseEntity<String>(headers, HttpStatus.MOVED_PERMANENTLY);
	}
	
	// TODO : This url should be secured
	@RequestMapping(value="logout", method= GET)
	public void logout(@RequestParam("token") String accessToken){
		Login login = loginRepository.findByPassword(accessToken);
		loginRepository.delete(login);
		googleAuthService.destroyToken(accessToken);
	}
	
}
