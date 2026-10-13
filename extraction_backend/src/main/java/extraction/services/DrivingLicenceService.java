package extraction.services;

import java.util.List;

import extraction.entities.CIN;
import extraction.entities.DrivingLicence;

public interface DrivingLicenceService {
    Long saveDrivingLicence(DrivingLicence drivingLicence);
    List<DrivingLicence> getAllDrivingLicence();
}
