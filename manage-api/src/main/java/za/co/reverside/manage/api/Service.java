package za.co.reverside.manage.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.co.reverside.manage.model.Consultant;
import za.co.reverside.manage.repository.ConsultantRepository;

import java.util.Date;
import java.util.List;

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

    @RequestMapping(value = "api/consultants", method = RequestMethod.GET)
    public List<Consultant> getConsultant(){
        return consultantRepository.findAll();
    }

    @RequestMapping(value = "api/consultants/add", method = RequestMethod.POST, consumes = "application/json")
    public void addConsultant(@RequestBody Consultant consultant) {
        consultantRepository.save(consultant);
    }


}
