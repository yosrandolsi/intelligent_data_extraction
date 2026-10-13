package extraction.services;

import extraction.entities.CIN;
import extraction.entities.Document;
import extraction.entities.DrivingLicence;
import extraction.entities.Invoice;
import extraction.entities.Passeport;
import extraction.entities.Receipt;
import extraction.repository.CINRepository;
import extraction.repository.DocumentRepository;
import extraction.repository.DrivingLicenceRepository;
import extraction.repository.InvoiceRepository;
import extraction.repository.PasseportRepository;
import extraction.repository.ReceiptRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DocumentServiceImpl implements DocumentService {
	private static final double MAX_SCORE = 100.0;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CINRepository cinRepository;
    @Autowired
    private ReceiptRepository receiptRepository;
    @Autowired
    private DrivingLicenceRepository drivingLicenceRepository;
    @Autowired
    private PasseportRepository passeportRepository;
    @Override
    public long countTotalDocuments() {
        return documentRepository.count();
    }

    @Override
    public Map<String, Long> countDocumentsByType() {
        List<Document> documents = documentRepository.findAll();
        Map<String, Long> documentCounts = new HashMap<>();

        for (Document document : documents) {
            String documentType = document.getClass().getSimpleName();
            documentCounts.put(documentType, documentCounts.getOrDefault(documentType, 0L) + 1);
        }

        return documentCounts;
    }
 // Dans DocumentService.java

    public Map<String, Long> countDocumentsByUsername(String username) {
        List<Document> userDocuments = documentRepository.findByUsername(username);
        Map<String, Long> documentCounts = new HashMap<>();

        for (Document document : userDocuments) {
            String documentType = document.getClass().getSimpleName();
            documentCounts.put(documentType, documentCounts.getOrDefault(documentType, 0L) + 1);
        }

        return documentCounts;
    }

    @Override
    public Map<String, Double> sumScorePercentageByType() {
        List<Document> documents = documentRepository.findAll();
        Map<String, Double> sumScorePercentageByType = new HashMap<>();
        Map<String, Double> sumScoresByType = new HashMap<>();
        Map<String, Long> documentCounts = countDocumentsByType();

        for (Document document : documents) {
            String documentType = document.getClass().getSimpleName();
            double sumScores = calculateSumScores(document);
            sumScoresByType.put(documentType, sumScoresByType.getOrDefault(documentType, 0.0) + sumScores);
        }

        for (Map.Entry<String, Double> entry : sumScoresByType.entrySet()) {
            String documentType = entry.getKey();
            double sumScores = entry.getValue();
            long documentCount = documentCounts.getOrDefault(documentType, 0L);
            double averageScore = sumScores / documentCount;
            double percentage = (averageScore / MAX_SCORE) * 100.0; // MAX_SCORE est à définir
            sumScorePercentageByType.put(documentType, percentage);
        }

        return sumScorePercentageByType;
    }

    private double calculateSumScores(Document document) {
        double sumScores = 0.0;

        if (document instanceof Invoice) {
            Invoice invoice = (Invoice) document;
            sumScores = (invoice.getInvoiceNumberScore() + invoice.getInvoiceDateScore() +
                    invoice.getTotalAmountScore() + invoice.getVendorNameScore() + invoice.getCustomerAddressScore()) / 5.0 * 100.0;
        } else if (document instanceof CIN) {
            CIN cin = (CIN) document;
            sumScores = (cin.getCinNumberScore() + cin.getFullNameScore() + cin.getDateOfBirthScore() +
                    cin.getNationalityScore() + cin.getExpiryDateScore() + cin.getIssueDateScore()) / 6.0 * 100.0;
        } else if (document instanceof Receipt) {
            Receipt receipt = (Receipt) document;
            sumScores = (receipt.getReceiptNumberScore() + receipt.getReceiptDateScore() +
                    receipt.getTotalAmountScore() + receipt.getStoreNameScore() + receipt.getSalesTaxScore()) / 5.0 * 100.0;
        } else if (document instanceof Passeport) {
            Passeport passport = (Passeport) document;
            sumScores = (passport.getPassportNumberScore() + passport.getGivenNameScore() +
                    passport.getSurnameScore() + passport.getNationalityScore() + passport.getDateOfBirthScore() +
                    passport.getIssueDateScore() + passport.getExpiryDateScore() + passport.getSexScore()) / 8.0 * 100.0;
        } else if (document instanceof DrivingLicence) {
            DrivingLicence drivingLicence = (DrivingLicence) document;
            sumScores = (drivingLicence.getLicenceNumberScore() + drivingLicence.getNameScore() +
                    drivingLicence.getDateOfBirthScore() + drivingLicence.getNationalityScore() +
                    drivingLicence.getExpiryDateScore() + drivingLicence.getIssueDateScore()) / 6.0 * 100.0;
        }
        // A}dd conditions for other document types if needed

        return sumScores;
    }
    @Override
    public Map<String, Double> sumScorePercentageByUsername(String username) {
        List<Document> userDocuments = documentRepository.findByUsername(username);
        Map<String, Double> sumScorePercentageByUsername = new HashMap<>();
        Map<String, Double> sumScoresByUsername = new HashMap<>();
        Map<String, Long> documentCounts = countDocumentsByType();

        for (Document document : userDocuments) {
            String documentType = document.getClass().getSimpleName();
            double sumScores = calculateSumScores(document);
            sumScoresByUsername.put(documentType, sumScoresByUsername.getOrDefault(documentType, 0.0) + sumScores);
        }

        for (Map.Entry<String, Double> entry : sumScoresByUsername.entrySet()) {
            String documentType = entry.getKey();
            double sumScores = entry.getValue();
            long documentCount = documentCounts.getOrDefault(documentType, 0L);
            double averageScore = sumScores / documentCount;
            double percentage = Math.min((averageScore / MAX_SCORE) * 100.0, 100.0); // MAX_SCORE est à définir
            sumScorePercentageByUsername.put(documentType, percentage);
        }

        return sumScorePercentageByUsername;
    }


    
  /*  @Override
    public Map<String, Long> countInvoicesForLast7Days() {
        // Créer une Map pour stocker les résultats
        Map<String, Long> invoicesCountByDay = new LinkedHashMap<>();

        // Obtenir la date actuelle
        LocalDate currentDate = LocalDate.now();

        // Créer une liste des 7 derniers jours
        List<LocalDate> last7Days = Stream.iterate(currentDate.minusDays(6), date -> date.plusDays(1))
                                         .limit(7)
                                         .collect(Collectors.toList());

        // Convertir les LocalDate en Timestamp
        List<Timestamp> last7DaysTimestamp = last7Days.stream()
                .map(localDate -> Timestamp.valueOf(localDate.atStartOfDay()))
                .collect(Collectors.toList());

        // Récupérer les factures pour les 7 derniers jours
        List<Invoice> invoices = documentRepository.findInvoicesByExtractionDateIn(last7DaysTimestamp);

        // Parcourir les factures et compter le nombre pour chaque jour
        for (LocalDate day : last7Days) {
            long count = invoices.stream()
            		.filter(invoice -> invoice.getExtractionDate().toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate()
                            .equals(day))
                                .count();
            invoicesCountByDay.put(day.toString(), count);
        }

        return invoicesCountByDay;
    }*/
  

    @Override
    public Map<Date, Long> countInvoicesForLast7Days() {
        Map<Date, Long> invoicesCountByDate = new LinkedHashMap<>();

        // Obtenir la date actuelle en tant que LocalDate
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            // Soustraire i jours de la date actuelle
            LocalDate date = currentDate.minusDays(i);
            // Convertir la LocalDate en Date en utilisant le fuseau horaire UTC
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
            // Compter les factures pour cette journée
            long count = invoiceRepository.countByExtractionDateBetween(startDate, endDate);
            // Ajouter le compte au map avec la date comme clé
            invoicesCountByDate.put(startDate, count);
        }

        return invoicesCountByDate;
    }
    public Map<Date, Long> countCINsForLast7Days() {
        Map<Date, Long> cinsCountByDate = new LinkedHashMap<>();

        // Obtenir la date actuelle en tant que LocalDate
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            // Soustraire i jours de la date actuelle
            LocalDate date = currentDate.minusDays(i);
            // Convertir la LocalDate en Date en utilisant le fuseau horaire UTC
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
 
			// Compter les CIN pour cette journée
            long count = cinRepository.countByExtractionDateBetween(startDate, endDate);
            // Ajouter le compte au map avec la date comme clé
            cinsCountByDate.put(startDate, count);
        }

        return cinsCountByDate;
    }
    public Map<Date, Long> countReceiptsForLast7Days() {
        Map<Date, Long> receiptsCountByDate = new LinkedHashMap<>();

        // Obtenir la date actuelle en tant que LocalDate
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            // Soustraire i jours de la date actuelle
            LocalDate date = currentDate.minusDays(i);
            // Convertir la LocalDate en Date en utilisant le fuseau horaire UTC
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());

            // Compter les reçus pour cette journée
            long count = receiptRepository.countByExtractionDateBetween(startDate, endDate);
            // Ajouter le compte au map avec la date comme clé
            receiptsCountByDate.put(startDate, count);
        }

        return receiptsCountByDate;
    }
    public Map<Date, Long> countDrivingLicencesForLast7Days() {
        Map<Date, Long> licencesCountByDate = new LinkedHashMap<>();

        // Obtenir la date actuelle en tant que LocalDate
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            // Soustraire i jours de la date actuelle
            LocalDate date = currentDate.minusDays(i);
            // Convertir la LocalDate en Date en utilisant le fuseau horaire UTC
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());

            // Compter les permis de conduire pour cette journée
            long count = drivingLicenceRepository.countByExtractionDateBetween(startDate, endDate);
            // Ajouter le compte au map avec la date comme clé
            licencesCountByDate.put(startDate, count);
        }

        return licencesCountByDate;
    }

    public Map<Date, Long> countPassportsForLast7Days() {
        Map<Date, Long> passportsCountByDate = new LinkedHashMap<>();

        // Obtenir la date actuelle en tant que LocalDate
        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            // Soustraire i jours de la date actuelle
            LocalDate date = currentDate.minusDays(i);
            // Convertir la LocalDate en Date en utilisant le fuseau horaire UTC
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());

            // Compter les passeports pour cette journée
            long count = passeportRepository.countByExtractionDateBetween(startDate, endDate);
            // Ajouter le compte au map avec la date comme clé
            passportsCountByDate.put(startDate, count);
        }

        return passportsCountByDate;
    }

    public Map<String, Map<Date, Long>> countDocumentsForLast7Days() {
        Map<String, Map<Date, Long>> documentsCounts = new LinkedHashMap<>();
        
        // Compter les factures pour les 7 derniers jours
        Map<Date, Long> invoicesCountByDate = countInvoicesForLast7Days();
        documentsCounts.put("invoices", invoicesCountByDate);
        
        // Compter les CIN pour les 7 derniers jours
        Map<Date, Long> cinsCountByDate = countCINsForLast7Days();
        documentsCounts.put("CIN", cinsCountByDate);
        Map<Date, Long> receiptsCountByDate = countReceiptsForLast7Days();
        documentsCounts.put("Receipts", receiptsCountByDate);
        
        Map<Date, Long> licencesCountByDate = countDrivingLicencesForLast7Days();
        documentsCounts.put("DrivingLicences", licencesCountByDate);
        
        Map<Date, Long> passportsCountByDate = countPassportsForLast7Days();
        documentsCounts.put("Passports", passportsCountByDate);
        return documentsCounts;
    }

    public Map<Date, Long> countInvoicesForLast7DaysByUsername(String username) {
        Map<Date, Long> invoicesCountByDate = new LinkedHashMap<>();

        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = currentDate.minusDays(i);
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
            long count = invoiceRepository.countByExtractionDateBetweenAndUsername(startDate, endDate, username);
            invoicesCountByDate.put(startDate, count);
        }

        return invoicesCountByDate;
    }

    public Map<Date, Long> countCINsForLast7DaysByUsername(String username) {
        Map<Date, Long> cinsCountByDate = new LinkedHashMap<>();

        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = currentDate.minusDays(i);
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
            long count = cinRepository.countByExtractionDateBetweenAndUsername(startDate, endDate, username);
            cinsCountByDate.put(startDate, count);
        }

        return cinsCountByDate;
    }

    public Map<Date, Long> countReceiptsForLast7DaysByUsername(String username) {
        Map<Date, Long> receiptsCountByDate = new LinkedHashMap<>();

        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = currentDate.minusDays(i);
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
            long count = receiptRepository.countByExtractionDateBetweenAndUsername(startDate, endDate, username);
            receiptsCountByDate.put(startDate, count);
        }

        return receiptsCountByDate;
    }

    public Map<Date, Long> countDrivingLicencesForLast7DaysByUsername(String username) {
        Map<Date, Long> licencesCountByDate = new LinkedHashMap<>();

        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = currentDate.minusDays(i);
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
            long count = drivingLicenceRepository.countByExtractionDateBetweenAndUsername(startDate, endDate, username);
            licencesCountByDate.put(startDate, count);
        }

        return licencesCountByDate;
    }

    public Map<Date, Long> countPassportsForLast7DaysByUsername(String username) {
        Map<Date, Long> passportsCountByDate = new LinkedHashMap<>();

        LocalDate currentDate = LocalDate.now();

        for (int i = 0; i < 7; i++) {
            LocalDate date = currentDate.minusDays(i);
            Date startDate = Date.from(date.atStartOfDay(ZoneOffset.UTC).toInstant());
            Date endDate = Date.from(date.atTime(LocalTime.MAX).atZone(ZoneOffset.UTC).toInstant());
            long count = passeportRepository.countByExtractionDateBetweenAndUsername(startDate, endDate, username);
            passportsCountByDate.put(startDate, count);
        }

        return passportsCountByDate;
    }

    public Map<String, Map<Date, Long>> countDocumentsForLast7DaysByUsername(String username) {
        Map<String, Map<Date, Long>> documentsCounts = new LinkedHashMap<>();
        
        Map<Date, Long> invoicesCountByDate = countInvoicesForLast7DaysByUsername(username);
        documentsCounts.put("Invoices", invoicesCountByDate);
        
        Map<Date, Long> cinsCountByDate = countCINsForLast7DaysByUsername(username);
        documentsCounts.put("CINs", cinsCountByDate);
        
        Map<Date, Long> receiptsCountByDate = countReceiptsForLast7DaysByUsername(username);
        documentsCounts.put("Receipts", receiptsCountByDate);
        
        Map<Date, Long> licencesCountByDate = countDrivingLicencesForLast7DaysByUsername(username);
        documentsCounts.put("DrivingLicences", licencesCountByDate);
        
        Map<Date, Long> passportsCountByDate = countPassportsForLast7DaysByUsername(username);
        documentsCounts.put("Passports", passportsCountByDate);
        
        return documentsCounts;
    }


}