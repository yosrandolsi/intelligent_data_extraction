package extraction.services;
import java.util.List;

import extraction.entities.Invoice;


public interface InvoiceService {
	 Long saveInvoice(Invoice invoice);
	 List<Invoice> getAllInvoices();
}
