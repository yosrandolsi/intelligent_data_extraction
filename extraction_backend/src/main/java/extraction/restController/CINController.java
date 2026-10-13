package extraction.restController;




import extraction.entities.CIN;
import extraction.entities.Invoice;
import extraction.repository.CINRepository;
import extraction.services.CINService;
import extraction.services.DocumentService;

import java.util.Date;
import java.util.List;
import java.util.Map;

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
public class CINController {

    private final CINService cinService;
    private final CINRepository cinRespository;
    @Autowired
    public CINController(CINService cinService,CINRepository cinRespository) {
        this.cinService = cinService;
		this.cinRespository = cinRespository;
    }
    @Autowired
    private DocumentService documentService;

    @PostMapping("/cin")
    public ResponseEntity<Void> saveCIN(@RequestBody CIN cin) {
        try {
            Long cinId = cinService.saveCIN(cin);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @RequestMapping(path = "/getAllCIN",method = RequestMethod.GET)
	public List<CIN> getAllCIN() {
		return cinRespository.findAll();
	 }
    @GetMapping("/count-cins-last-7-days")
    public Map<Date, Long> countCINsForLast7Days() {
        return documentService.countCINsForLast7Days();
    }

}
