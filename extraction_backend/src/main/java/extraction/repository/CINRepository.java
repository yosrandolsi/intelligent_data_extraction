package extraction.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import extraction.entities.CIN;
import extraction.entities.Invoice;

public interface CINRepository extends JpaRepository<CIN, Long> {
    // Ajoutez des méthodes personnalisées de requête si nécessaire
	List<CIN> findAll();

	long countByExtractionDateBetween(Date startDate, Date endDate);

	long countByExtractionDateBetweenAndUsername(Date startDate, Date endDate, String username);


}

