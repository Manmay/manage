package za.co.reverside.manage.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Consultant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String firstName ;
    @Column
    private String lastName;
    @Column
    private String designation;
    @Column
    private String email;
    @Column
    private String phone;
    @Column
    private String photo;
    @Column
    private String quote;
}
