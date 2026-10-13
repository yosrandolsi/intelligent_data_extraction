package extraction.services;

import extraction.entities.Passeport;
import extraction.entities.Receipt;
import extraction.repository.ReceiptRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReceiptServicempl implements ReceiptService {

    private final ReceiptRepository receiptRepository;

    @Autowired
    public ReceiptServicempl(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    @Override
    public Long saveReceipt(Receipt receipt) {
        Receipt savedReceipt = receiptRepository.save(receipt);
        return savedReceipt.getDocumentId();   }
    @Override
    public List<Receipt> getAllReceipt() {
        return receiptRepository.findAll(); // Récupère toutes les factures depuis la base de données
    }
}
