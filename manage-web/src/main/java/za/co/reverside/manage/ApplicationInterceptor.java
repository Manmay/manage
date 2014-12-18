package za.co.reverside.manage;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class ApplicationInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
    	 httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");
    	return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        System.out.println("Post Handle");
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        System.out.println("After Completion");
        System.out.println(httpServletRequest.getRequestURI());
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "*");
    }
}
