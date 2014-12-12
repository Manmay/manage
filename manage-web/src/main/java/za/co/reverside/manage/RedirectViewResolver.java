package za.co.reverside.manage;

import java.util.Locale;

import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Component
public class RedirectViewResolver implements ViewResolver, Ordered {
    private int order = Integer.MIN_VALUE;

    public View resolveViewName(String viewName, Locale arg1) throws Exception {
        if (viewName.startsWith(UrlBasedViewResolver.REDIRECT_URL_PREFIX)) {
            String redirectUrl = viewName.substring(UrlBasedViewResolver.REDIRECT_URL_PREFIX.length());
            return new RedirectView(redirectUrl, true);
        }
        return null;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}