package extraction.services;

import extraction.entities.Evaluation;
import extraction.repository.EvaluationRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class EvaluationServiceImpl implements EvaluationService {
    private final EvaluationRepository evaluationRepository;

    @Autowired
    public EvaluationServiceImpl(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    @Override
    public Evaluation saveEvaluation(Evaluation evaluation) {
        // Implémentez ici toute logique de validation ou de traitement avant la sauvegarde
        return evaluationRepository.save(evaluation);
    }
    
    @Override
    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }
    @Override
    public Map<String, Integer> countEvaluationNotes() {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        Map<String, Integer> countMap = new HashMap<>();
        
        // Initialisation du comptage
        countMap.put("Excellent", 0);
        countMap.put("Good", 0);
        countMap.put("Amazing", 0);
      
        countMap.put("Medium", 0);
        countMap.put("Bad", 0);
        
        // Parcours des évaluations et comptage des notes
        for (Evaluation evaluation : evaluations) {
            String note = evaluation.getNote();
            // Conversion en casse appropriée pour correspondre aux valeurs de la map
            note = note.substring(0, 1).toUpperCase() + note.substring(1).toLowerCase();
            if (countMap.containsKey(note)) {
                countMap.put(note, countMap.get(note) + 1);
            }
        }
        
        return countMap;
    }

    @Override
    public List<Evaluation> filterEvaluationsByRating(String filterType) {
        List<Evaluation> evaluations = evaluationRepository.findAll();
        List<Evaluation> sortedEvaluations = new ArrayList<>();

        // Filtrer les évaluations selon le type de filtre requis
        switch (filterType) {
            case "badToExcellent":
                // Organiser les évaluations de "Bad" à "Excellent"
                sortedEvaluations.addAll(filterByNote(evaluations, "Bad"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Medium"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Good"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Amazing"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Excellent"));
                break;
            case "excellentToBad":
                // Organiser les évaluations de "Excellent" à "Bad"
                sortedEvaluations.addAll(filterByNote(evaluations, "Excellent"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Amazing"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Good"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Medium"));
                sortedEvaluations.addAll(filterByNote(evaluations, "Bad"));
                break;
            default:
                // Gérer d'autres cas si nécessaire
                sortedEvaluations.addAll(evaluations);
                break;
        }

        return sortedEvaluations;
    }

    // Méthode utilitaire pour filtrer les évaluations par note
    private List<Evaluation> filterByNote(List<Evaluation> evaluations, String note) {
        List<Evaluation> filteredEvaluations = new ArrayList<>();
        for (Evaluation evaluation : evaluations) {
            if (evaluation.getNote().equalsIgnoreCase(note)) {
                filteredEvaluations.add(evaluation);
            }
        }
        return filteredEvaluations;
    }
}