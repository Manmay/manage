package za.co.reverside.manage.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.util.ReflectionTestUtils;
import za.co.reverside.manage.model.Consultant;
import za.co.reverside.manage.repository.ConsultantRepository;

import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.ReflectionTestUtils.setField;


@RunWith(MockitoJUnitRunner.class)
public class ServiceTest {

    private Service service;

    @Mock
    private ConsultantRepository mConsultantRepository;

    @Before
    public void setUp() {
        service = new Service();
        setField(service, "consultantRepository", mConsultantRepository);
    }

    @Test
    public void testGetTime() {
        String result = service.getTime();
        assertNotNull(result);
    }

    @Test
    public void testGetConsultant() throws IOException {
        String data = "{\"id\":1, \"firstName\":\"Pragati\", \"lastName\":\"Prusty\", \"designation\":\"Associate Consultant\", \"email\":\"pragati.prusty@reverside.co.za\", \"phone\":\"0846860904\", \"photo\":\"/image/pragati-prusty.jpg\", \"quote\":\"I m what I m\" }";

        when(mConsultantRepository.findOne(1L)).thenReturn(new ObjectMapper().readValue(data.getBytes(), Consultant.class));

        Consultant result = service.getConsultant(1L);

        verify(mConsultantRepository, times(1)).getOne(1L);

        assertEquals(1L, result.getId().longValue());
        assertEquals("Pragati", result.getFirstName());
        assertEquals("Prusty", result.getLastName());
        assertEquals("Associate Consultant", result.getDesignation());
        assertEquals("pragati.prusty@reverside.co.za", result.getEmail());
        assertEquals("0846860904", result.getPhone());
        assertEquals("/image/pragati-prusty.jpg", result.getPhoto());
        assertEquals("I m what I m", result.getQuote());
    }

}
