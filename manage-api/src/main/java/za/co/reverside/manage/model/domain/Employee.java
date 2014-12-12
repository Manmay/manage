package za.co.reverside.manage.model.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import za.co.reverside.manage.model.google.GoogleUser;


@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String firstName ;
    @Column
    private String lastName;
    @Column(unique = true)
    private String email;
    @Column
    private String phone;
    @Column
    private String photo;
    @Column
    private String designation;
    
    public Employee(){
    	
    }
	
    public Employee(GoogleUser googleUser) {
		this.firstName = googleUser.getFirstName();
		this.lastName = googleUser.getLastName();
		this.email = googleUser.getEmail();
		this.photo = googleUser.getPicture();
	}
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}

}
