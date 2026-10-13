package extraction.restController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import extraction.entities.Invoice;
import extraction.entities.User;
import extraction.repository.InvoiceRepository;
import extraction.services.DocumentService;
import extraction.services.InvoiceService;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class InvoiceController {

	  private final InvoiceService invoiceService;
	  private final InvoiceRepository invoiceRepository;
	  @Autowired
	    private DocumentService documentService;

	    @Autowired
	    public InvoiceController(InvoiceService invoiceService, InvoiceRepository invoiceRepository) {
	        this.invoiceService = invoiceService;
			this.invoiceRepository = invoiceRepository;
	        
	    }

	    @PostMapping("/invoices")
	    public ResponseEntity<Long> saveInvoice(@RequestBody Invoice invoice) {
	        try {
	            // Vérifier si l'invoice est null
	            if (invoice == null) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1L); // Retourner une réponse indiquant une requête incorrecte
	            }
	            
	            // Enregistrer l'invoice
	            Long invoiceId = invoiceService.saveInvoice(invoice);
	            return ResponseEntity.ok(invoiceId);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1L); // -1 ou null pour indiquer une erreur
	        }
	    }

	
	    @RequestMapping(path = "/getAllInvoices",method = RequestMethod.GET)
		public List<Invoice> getAllInvoices() {
			return invoiceRepository.findAll();
		 }
	    @GetMapping("/count-last-7-days")
	    public Map<Date, Long> countInvoicesForLast7Days() {
	        return documentService.countInvoicesForLast7Days();
	    }
}
