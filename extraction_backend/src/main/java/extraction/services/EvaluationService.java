package extraction.services;

import java.util.List;
import java.util.Map;

import extraction.entities.Evaluation;

public interface EvaluationService {

	Evaluation saveEvaluation(Evaluation evaluation);

	List<Evaluation> getAllEvaluations();

	Map<String, Integer> countEvaluationNotes();

	List<Evaluation> filterEvaluationsByRating(String filterType);

}
