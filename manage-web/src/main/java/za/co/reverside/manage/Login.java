package za.co.reverside.manage;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Login {
	
	@RequestMapping(value="oauth2callback", method=RequestMethod.GET, produces="text/plain")
	public String loginGet(HttpServletRequest request) throws IllegalStateException, IOException, ServletException{
		System.out.println("User Login GET");
		System.out.println(request.getQueryString());
		System.out.println(request.getRequestURI());
		System.out.println(request.getParts().size());
		System.out.println(request.getParameterValues("code").length);
		return "Hello GET";
	}
	
	@RequestMapping(value="redirect", method=RequestMethod.GET)
	public String redirect(HttpServletResponse response) throws IOException{
		return "redirect: www.reverside.co.za";
	}
	

}
