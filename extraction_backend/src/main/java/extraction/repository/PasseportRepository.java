package extraction.repository;

import extraction.entities.Invoice;
import extraction.entities.Passeport;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasseportRepository extends JpaRepository<Passeport, Long> {
	List<Passeport> findAll();

	long countByExtractionDateBetween(Date startDate, Date endDate);

	long countByExtractionDateBetweenAndUsername(Date startDate, Date endDate, String username);
}