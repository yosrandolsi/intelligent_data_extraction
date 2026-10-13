package extraction.services;

import extraction.entities.CIN;
import extraction.entities.DrivingLicence;
import extraction.repository.DrivingLicenceRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DrivingLicencempl implements DrivingLicenceService {

    private final DrivingLicenceRepository drivingLicenceRepository;

    @Autowired
    public DrivingLicencempl(DrivingLicenceRepository drivingLicenceRepository) {
        this.drivingLicenceRepository = drivingLicenceRepository;
    }

    @Override
    public Long saveDrivingLicence(DrivingLicence drivingLicence) {
        return drivingLicenceRepository.save(drivingLicence).getDocumentId();
    }
    @Override
    public List<DrivingLicence> getAllDrivingLicence() {
        return drivingLicenceRepository.findAll(); // Récupère toutes les factures depuis la base de données
    }
    
}
