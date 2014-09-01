package za.co.reverside.manage.model;

import lombok.Data;

@Data
public class Employee {

    private long id;
    private String name ;
    private String email;
    private long phoneNumber;
    private String imgUrl;
    private String designation;
    private String urls;
}
