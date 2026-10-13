package extraction.services;

import extraction.entities.CIN;
import extraction.entities.Invoice;
import extraction.repository.CINRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CINServicempl implements CINService {

    private final CINRepository cinRepository;

    @Autowired
    public CINServicempl(CINRepository cinRepository) {
        this.cinRepository = cinRepository;
    }

    @Override
    public Long saveCIN(CIN cin) {
        CIN savedCIN = cinRepository.save(cin);
        return savedCIN.getDocumentId(); // Assuming CIN entity has getId() method to retrieve the saved ID
    }
    @Override
    public List<CIN> getAllCIN() {
        return cinRepository.findAll(); // Récupère toutes les factures depuis la base de données
    }
}
