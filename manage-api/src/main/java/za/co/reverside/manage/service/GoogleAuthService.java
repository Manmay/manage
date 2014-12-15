package za.co.reverside.manage.service;

import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import za.co.reverside.manage.model.google.GoogleUser;
import za.co.reverside.manage.model.google.GoogleToken;

@Repository
public class GoogleAuthService {

	private RestTemplate restTemplate;

	public GoogleAuthService(){
		restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(new FormHttpMessageConverter());
	}
	
	public GoogleToken createToken(String authorizationCode) {
		String url = "https://www.googleapis.com//oauth2/v3/token";
		MultiValueMap<String, String> request = new LinkedMultiValueMap<String, String>();
		request.add("code", authorizationCode);
		request.add("client_id","21960379372-a7l6nn0qb00peo711rc6vigoc1mrje6v.apps.googleusercontent.com");
		request.add("client_secret", "WyEN3CnWlok96yoRZv_nSqgX");
		request.add("grant_type", "authorization_code");
		request.add("redirect_uri", "http://localhost:9090/login");
		GoogleToken reponse = restTemplate.postForObject(url, request, GoogleToken.class);
		return reponse;
	}
	
	public GoogleUser getUserInfo(String accessToken){
		String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
		return restTemplate.getForObject(url, GoogleUser.class);
	}

	public void destroyToken(String accessToken){
		String url = "https://accounts.google.com/o/oauth2/revoke?token=" + accessToken;
		restTemplate.getForObject(url, Object.class);
	}

}
