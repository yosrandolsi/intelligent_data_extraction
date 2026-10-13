package extraction.restController;


import extraction.entities.Evaluation;
import extraction.services.EvaluationService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class EvaluationController {
    private final EvaluationService evaluationService;

    @Autowired
    public EvaluationController(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    @PostMapping("/saveEvaluation")
    public ResponseEntity<Evaluation> saveEvaluation(@RequestBody Evaluation evaluation) {
        Evaluation savedEvaluation = evaluationService.saveEvaluation(evaluation);
        return new ResponseEntity<>(savedEvaluation, HttpStatus.CREATED);
    }
    
    @GetMapping("/getEvaluation")
    public ResponseEntity<List<Evaluation>> getAllEvaluations() {
        List<Evaluation> evaluations = evaluationService.getAllEvaluations();
        return new ResponseEntity<>(evaluations, HttpStatus.OK);
    }
    @GetMapping("/count-notes")
    public Map<String, Integer> countEvaluationNotes() {
        return evaluationService.countEvaluationNotes();
    }
    @GetMapping("/filter-evaluations")
    public ResponseEntity<List<Evaluation>> filterEvaluations(@RequestParam String filterType) {
        List<Evaluation> filteredEvaluations = evaluationService.filterEvaluationsByRating(filterType);
        return new ResponseEntity<>(filteredEvaluations, HttpStatus.OK);
    }

}
