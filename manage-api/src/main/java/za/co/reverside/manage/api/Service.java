package za.co.reverside.manage.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import za.co.reverside.manage.model.Consultant;
import za.co.reverside.manage.repository.ConsultantRepository;

import java.util.Date;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class Service {

    @Autowired
    private ConsultantRepository consultantRepository;

    @RequestMapping(value = "api/time", method = GET)
    public String getTime(){
        return new Date().toString();
    }

    @RequestMapping(value = "api/consultants/{id}", method = RequestMethod.GET)
    public Consultant getConsultant(@PathVariable("id") Long id){
        Consultant consultant = consultantRepository.findOne(id);
        return consultant;
    }

}
