package extraction.repository;

import extraction.entities.CIN;
import extraction.entities.DrivingLicence;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrivingLicenceRepository extends JpaRepository<DrivingLicence, Long> {
	List<DrivingLicence> findAll();

	long countByExtractionDateBetween(Date startDate, Date endDate);

	long countByExtractionDateBetweenAndUsername(Date startDate, Date endDate, String username);
}
