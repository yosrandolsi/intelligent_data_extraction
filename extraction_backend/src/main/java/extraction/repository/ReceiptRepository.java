package extraction.repository;

import extraction.entities.Passeport;
import extraction.entities.Receipt;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    // Vous pouvez ajouter des méthodes de requête personnalisées ici si nécessaire
	List<Receipt> findAll();

	long countByExtractionDateBetween(Date startDate, Date endDate);

	long countByExtractionDateBetweenAndUsername(Date startDate, Date endDate, String username);
}