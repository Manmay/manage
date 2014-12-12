package za.co.reverside.manage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.reverside.manage.model.domain.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
	
	public Login findByUserName(String userName);
}
