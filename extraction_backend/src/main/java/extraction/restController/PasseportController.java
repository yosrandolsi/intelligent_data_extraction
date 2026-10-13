package extraction.restController;



import extraction.entities.Invoice;
import extraction.entities.Passeport;
import extraction.repository.PasseportRepository;
import extraction.services.PasseportService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PasseportController {

    private final PasseportService passeportService;
    private final PasseportRepository passeportRepository;
    @Autowired
    public PasseportController(PasseportService passeportService,PasseportRepository passeportRepository) {
        this.passeportService = passeportService;
		this.passeportRepository = passeportRepository;
    }

    @PostMapping("/passeports")
    public ResponseEntity<Void> savePasseport(@RequestBody Passeport passeport) {
        try {
            passeportService.savePasseport(passeport);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @RequestMapping(path = "/getAllPasseport",method = RequestMethod.GET)
	public List<Passeport> getAllPasseport() {
		return passeportRepository.findAll();
	 }
}

