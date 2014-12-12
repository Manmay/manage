package za.co.reverside.manage;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

public class Test {
	
	public static void main(String[] args) throws IOException {
		String urlString = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=ya29.2gAlzCiXwe3z8mwd4_OCcvOzRt-_R9HAbZGza0Hy66nFKHbme3FasIHEmFRBNPbVOGx004fXca1EGA";
		URL url = new URL(urlString);
		InputStream in = url.openStream();
		while(in.available()!=0){
			System.out.print((char)in.read());
		}	
	}
	
}
