package za.co.reverside.manage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.co.reverside.manage.model.Consultant;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
}
