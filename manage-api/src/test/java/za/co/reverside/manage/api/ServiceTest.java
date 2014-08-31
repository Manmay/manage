package za.co.reverside.manage.api;

import org.junit.Test;

import static org.junit.Assert.assertNotNull;

public class ServiceTest {


    @Test
    public void testGetTime(){
        Service service = new Service();
        String result = service.getTime();
        assertNotNull(result);
    }

}
