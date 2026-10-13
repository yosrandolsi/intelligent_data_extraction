package extraction.repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import extraction.entities.Document;
import extraction.entities.Invoice;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
	 List<Document> findByExtractionDateBetween(Date startDate, Date endDate);

	List<Document> findByExtractionDate(Date date);

	List<Invoice> findInvoicesByExtractionDateBetween(Date startDate, Date currentDate);


	 List<Invoice> findInvoicesByExtractionDateIn(List<Timestamp> dates);

	long countInvoicesByExtractionDate(Date javaDate);

	List<Document> findByUsername(String username);




}