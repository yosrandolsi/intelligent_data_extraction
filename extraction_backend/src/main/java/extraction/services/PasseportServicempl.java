package extraction.services;

import extraction.entities.Invoice;
import extraction.entities.Passeport;
import extraction.repository.PasseportRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasseportServicempl implements PasseportService {

    private final PasseportRepository passeportRepository;

    @Autowired
    public PasseportServicempl(PasseportRepository passeportRepository) {
        this.passeportRepository = passeportRepository;
    }

    @Override
    public Long savePasseport(Passeport passeport) {
        Passeport savedPasseport = passeportRepository.save(passeport);
        return savedPasseport.getDocumentId();    }
    
    @Override
    public List<Passeport> getAllPasseport() {
        return passeportRepository.findAll(); // Récupère toutes les factures depuis la base de données
    }
}
