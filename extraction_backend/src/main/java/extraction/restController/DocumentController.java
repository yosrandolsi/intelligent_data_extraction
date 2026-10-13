package extraction.restController;

import extraction.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController

public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @GetMapping("/count")
    public ResponseEntity<Long> countTotalDocuments() {
        long totalDocuments = documentService.countTotalDocuments();
        return ResponseEntity.ok(totalDocuments);
    }

    @GetMapping("/countByType")
    public ResponseEntity<Map<String, Long>> countDocumentsByType() {
        Map<String, Long> documentCountsByType = documentService.countDocumentsByType();
        return ResponseEntity.ok(documentCountsByType);
    }
    @GetMapping("/countByUser/{username}")
    public ResponseEntity<Map<String, Long>> countDocumentsByUsername(@PathVariable String username) {
        Map<String, Long> documentCounts = documentService.countDocumentsByUsername(username);
        return new ResponseEntity<>(documentCounts, HttpStatus.OK);
    }
    @GetMapping("/sumScorePercentageByType")
    public ResponseEntity<Map<String, Double>> getSumScorePercentageByType() {
        Map<String, Double> sumScorePercentageByType = documentService.sumScorePercentageByType();
        return ResponseEntity.ok(sumScorePercentageByType);
    }
    
  
    /*@GetMapping("/last7days")
    public ResponseEntity<Map<String, Long>> getInvoicesCountForLast7Days() {
        Map<String, Long> invoicesCountByDay = documentService.countInvoicesForLast7Days();
        return new ResponseEntity<>(invoicesCountByDay, HttpStatus.OK);
    }*/
    @GetMapping("/count-documents-last-7-days")
    public Map<String, Map<Date, Long>> countDocumentsForLast7Days() {
        return documentService.countDocumentsForLast7Days();
    }
    
    @GetMapping("/sumScorePercentageByUsername/{username}")
    public ResponseEntity<Map<String, Double>> getSumScorePercentageByUsername(@PathVariable String username) {
        Map<String, Double> sumScoresByType = documentService.sumScorePercentageByUsername(username);
        return ResponseEntity.ok(sumScoresByType);
    }
    
    @GetMapping("/countDocumentsForLast7DaysByUsername/{username}")
    public Map<String, Map<Date, Long>> countDocumentsForLast7DaysByUsername(@PathVariable String username) {
        return documentService.countDocumentsForLast7DaysByUsername(username);
    }
}
