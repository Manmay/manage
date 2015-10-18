package za.co.reverside.manage.model.domain;

import javax.persistence.*;

import za.co.reverside.manage.model.google.GoogleUser;

import java.util.Date;


@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "first_name", nullable = false)
    private String firstName ;
    @Column(name = "last_name", nullable = false)
    private String lastName;
	@Column(name = "photo", nullable = false)
	private String photo;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "phone")
    private String phone;
	@Column(name = "location")
	private String location;
    @Column(name = "designation")
    private String designation;
	@Column(name = "gender")
	private String gender;
	@Column(name = "birth_date")
	private Date dateOfBirth;
	@Column(name = "joining_date")
	private Date dateOfJoining;
	@Column(name = "marriage_date")
	private Date dateOfMarriage;
	@Column(name = "role", nullable = false)
    private String role;
	@Column(name = "enabled", nullable = false)
	private Boolean enabled;

    public Employee(){
    }

    public Employee(GoogleUser googleUser) {
		this.firstName = googleUser.getFirstName();
		this.lastName = googleUser.getLastName();
		this.email = googleUser.getEmail();
		this.photo = googleUser.getPicture();
		this.gender = googleUser.getGender();
		this.role = "ROLE_USER";
		this.enabled = true;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
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

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Date getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(Date dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public Date getDateOfMarriage() {
		return dateOfMarriage;
	}

	public void setDateOfMarriage(Date dateOfMarriage) {
		this.dateOfMarriage = dateOfMarriage;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getFullName(){
		return firstName+" "+lastName;
	}

}
