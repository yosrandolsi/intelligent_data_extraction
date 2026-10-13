package extraction.services;

import java.util.List;

import extraction.entities.Invoice;
import extraction.entities.Passeport;

public interface PasseportService {
    Long savePasseport(Passeport passeport);
    List<Passeport> getAllPasseport();
}
