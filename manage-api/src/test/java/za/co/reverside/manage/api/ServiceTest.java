package za.co.reverside.manage.api;

import org.junit.Test;
import za.co.reverside.manage.model.Employee;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ServiceTest {


    @Test
    public void testGetTime() {
        Service service = new Service();
        String result = service.getTime();
        assertNotNull(result);
    }

    @Test
    public void testGetEmployee() {
        Service service = new Service();
        Employee result = service.getEmployee(1L);
        assertEquals(1, result.getId());
        assertEquals("Pragati Kumar Prusty", result.getName());
        assertEquals("pragat.prusty@reverside.co.za", result.getEmail());
        assertEquals(" Consultant", result.getDesignation());
        assertEquals("D:/image", result.getImgUrl());
        assertEquals(846860904, result.getPhoneNumber());
        assertEquals("fb/pragati/prusty.123", result.getUrls());
    }

}
