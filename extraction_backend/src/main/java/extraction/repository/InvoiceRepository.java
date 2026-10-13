package extraction.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import extraction.entities.Invoice;


public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
	  List<Invoice> findAll();

	long countByExtractionDateBetween(Date startDate, Date endDate);

	long countByExtractionDateBetweenAndUsername(Date startDate, Date endDate, String username);


}

