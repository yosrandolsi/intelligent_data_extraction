package extraction.services;

import java.util.Date;
import java.util.Map;

public interface DocumentService {
    long countTotalDocuments();

    Map<String, Long> countDocumentsByType();

    Map<String, Double> sumScorePercentageByType();

	

	Map<Date, Long> countInvoicesForLast7Days();

	Map<Date, Long> countCINsForLast7Days();

	Map<String, Map<Date, Long>> countDocumentsForLast7Days();

	Map<String, Long> countDocumentsByUsername(String username);

	Map<String, Double> sumScorePercentageByUsername(String username);

	Map<String, Map<Date, Long>> countDocumentsForLast7DaysByUsername(String username);

	





}
