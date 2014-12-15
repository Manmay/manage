package za.co.reverside.manage.api;

import org.junit.Test;
import org.springframework.web.client.RestTemplate;
import za.co.reverside.manage.model.google.TokenRequest;
import za.co.reverside.manage.model.google.TokenResponse;

import java.util.HashMap;

public class ServiceTest {

    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        TokenRequest tokenRequest = new TokenRequest();
        tokenRequest.setCode("4/fc5vLddEH6fCcmuJ3RiE-q5uK7ZMNlyTm4O7MWmd_UM.8j_JRPlcHRsboiIBeO6P2m9WzKWTlAI");
        tokenRequest.setClientId("21960379372-a7l6nn0qb00peo711rc6vigoc1mrje6v.apps.googleusercontent.com");
        tokenRequest.setClientSecret("WyEN3CnWlok96yoRZv_nSqgX");
        tokenRequest.setGrantType("authorization_code");
        tokenRequest.setRedirectUri("http://localhost:8080/login.html");
        TokenResponse tokenResponse = restTemplate.postForObject("https://www.googleapis.com/oauth2/v3/token", tokenRequest, TokenResponse.class);
        System.out.println(tokenResponse.getAccessToken());
    }

}
