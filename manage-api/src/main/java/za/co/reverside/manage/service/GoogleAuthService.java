package za.co.reverside.manage.service;

import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import za.co.reverside.manage.model.google.GoogleUser;

@Repository
public class GoogleAuthService {

	private RestTemplate restTemplate;

	public GoogleAuthService(){
		restTemplate = new RestTemplate();
	}
	
	public GoogleUser validateAccessToken(String accessToken){
		String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
		return restTemplate.getForObject(url, GoogleUser.class);
	}

	public void invalidateAccessToken(String accessToken){
		String url = "https://accounts.google.com/o/oauth2/revoke?token=" + accessToken;
		restTemplate.getForObject(url, Object.class);
	}

}
