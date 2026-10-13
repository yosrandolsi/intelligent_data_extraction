package extraction.services;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import extraction.entities.Invoice;
import extraction.repository.InvoiceRepository;
import jakarta.transaction.Transactional;





@Service
public class InvoiceServiceImpl implements InvoiceService {

    private InvoiceRepository invoiceRepository;

    @Autowired
    public void setInvoiceRepository(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    @Transactional
    public Long saveInvoice(Invoice invoice) {
        // Faire d'autres opérations nécessaires avant de sauvegarder l'invoice
        // par exemple, vérifier si l'invoice existe déjà, effectuer des validations, etc.
        
        // Ensuite, sauvegarder l'invoice
        return invoiceRepository.save(invoice).getDocumentId(); // Retourne l'identifiant du document
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll(); // Récupère toutes les factures depuis la base de données
    }
}
