package extraction.services;

import java.util.List;

import extraction.entities.CIN;
import extraction.entities.Invoice;

public interface CINService {
	Long saveCIN(CIN cin);
	List<CIN> getAllCIN();
}
