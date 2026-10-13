package extraction.restController;



import extraction.entities.Passeport;
import extraction.entities.Receipt;
import extraction.repository.ReceiptRepository;
import extraction.services.ReceiptService;

import java.util.List;

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

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ReceiptController {

    private final ReceiptService receiptService;
    private final ReceiptRepository receiptRepository;
    @Autowired
    public ReceiptController(ReceiptService receiptService,ReceiptRepository receiptRepository) {
        this.receiptService = receiptService;
		this.receiptRepository = receiptRepository;
    }

    @PostMapping("/receipts")
    public ResponseEntity<Void> saveReceipt(@RequestBody Receipt receipt) {
        try {
            receiptService.saveReceipt(receipt);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @RequestMapping(path = "/getAllReceipt",method = RequestMethod.GET)
   	public List<Receipt> getAllReceipt() {
   		return receiptRepository.findAll();
   	 }
   

}

