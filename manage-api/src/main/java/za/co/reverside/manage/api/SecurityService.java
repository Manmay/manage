package za.co.reverside.manage.api;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CookieValue;
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
	public ResponseEntity<String> login(@RequestParam(value="code", required = false) String authorizationCode,
										@RequestParam(value="error", required = false) String error,
										@RequestParam("state") String requestedUrl) {

		System.out.println("Requested URL : "+requestedUrl);

		if(error!=null){
			MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
			headers.add("Location", "http://localhost:8080/index.html");
			headers.add("Set-Cookie", "message="+error);
			return new ResponseEntity<String>(headers, HttpStatus.MOVED_PERMANENTLY);
		}

		GoogleToken googleToken = googleAuthService.createToken(authorizationCode);		
		GoogleUser googleUser = googleAuthService.getUserInfo(googleToken.getAccessToken());		

        if(!googleUser.getEmail().endsWith("reverside.co.za")){
			googleAuthService.destroyToken(googleToken.getAccessToken());
			MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
			headers.add("Location", "http://localhost:8080/index.html");
			headers.add("Set-Cookie", "message=Please login with your reverside credentials");
			return new ResponseEntity<String>(headers, HttpStatus.MOVED_PERMANENTLY);
		}

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
		String token = new String(Base64.encodeBase64(((login.getUserName() + ":" + login.getPassword()).getBytes())));
		headers.add("Set-Cookie", "token="+token);
		return new ResponseEntity<String>(headers, HttpStatus.MOVED_PERMANENTLY);
	}
	
	@RequestMapping(value="logout", method= GET)
	public ResponseEntity<String>  logout(@CookieValue("token") String token){
		System.out.println("Logout Start");
		token = new String(Base64.decodeBase64(token));
		String accessToken = token.split(":")[1];

		Login login = loginRepository.findByPassword(accessToken);
		if(login != null)
			loginRepository.delete(login);
		try {
			googleAuthService.destroyToken(accessToken);
		}catch(Exception e){
			e.printStackTrace();
		}
		System.out.println("Logout End");

		MultiValueMap<String, String> headers = new LinkedMultiValueMap<String, String>();
		headers.add("Location", "http://localhost:8080/index.html");
		headers.add("Set-Cookie", "token=; Max-Age=0");
		headers.add("Set-Cookie", "message=; Max-Age=0");

		return new ResponseEntity<String>(headers, HttpStatus.MOVED_PERMANENTLY);
	}
	
}
