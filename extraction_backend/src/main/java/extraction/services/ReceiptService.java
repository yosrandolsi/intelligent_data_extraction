package extraction.services;

import java.util.List;

import extraction.entities.Invoice;
import extraction.entities.Receipt;

public interface ReceiptService {
    Long saveReceipt(Receipt receipt);
    List<Receipt> getAllReceipt();
}
