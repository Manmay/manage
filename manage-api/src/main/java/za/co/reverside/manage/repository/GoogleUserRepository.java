package za.co.reverside.manage.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import za.co.reverside.manage.model.google.GoogleUser;

@Repository
public class GoogleUserRepository {
	
	public GoogleUser findByAccessToken(String accessToken){
		RestTemplate restTemplate = new RestTemplate();
		String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
		GoogleUser googleUser = restTemplate.getForObject(url, GoogleUser.class);
		return googleUser;
	}

}
