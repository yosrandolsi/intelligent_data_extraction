package extraction.restController;


import extraction.entities.CIN;
import extraction.entities.DrivingLicence;
import extraction.repository.DrivingLicenceRepository;
import extraction.services.DrivingLicenceService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DrivingLicenceController {

    private final DrivingLicenceService drivingLicenceService;
    private final DrivingLicenceRepository drivingLicenceRepository;
    @Autowired
    public DrivingLicenceController(DrivingLicenceService drivingLicenceService,DrivingLicenceRepository drivingLicenceRepository) {
        this.drivingLicenceService = drivingLicenceService;
		this.drivingLicenceRepository =  drivingLicenceRepository;
    }

    @PostMapping("/drivingLicences")
    public ResponseEntity<Void> saveDrivingLicence(@RequestBody DrivingLicence drivingLicence) {
        try {
            drivingLicenceService.saveDrivingLicence(drivingLicence);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @RequestMapping(path = "/getAllDrivingLicence",method = RequestMethod.GET)
 	public List<DrivingLicence> getAllDrivingLicence() {
 		return  drivingLicenceRepository.findAll();
 	 }
}

