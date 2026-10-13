package extraction.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Date; // Import de la classe Date

@Entity
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String note;
    private String message;
    @Column(name = "username") // Ajout d'une colonne pour stocker le nom d'utilisateur
    private String username; // Propriété pour stocker le nom d'utilisateur

    @Column(name = "evaluation_date") // Ajout d'une colonne pour stocker la date d'extraction
    private Date extractionDate = new Date(); // Initialisation avec la date actuelle

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructeur par défaut
    public Evaluation() {
    }

    // Constructeur avec tous les champs
    public Evaluation(String note, String message, User user) {
        super();
        this.note = note;
        this.message = message;
        this.user = user;
        if (user != null) {
            this.username = user.getUsername(); // Attribuer le nom d'utilisateur de l'utilisateur associé
        }
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getExtractionDate() {
        return extractionDate;
    }

    public void setExtractionDate(Date extractionDate) {
        this.extractionDate = extractionDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        if (user != null) {
            this.username = user.getUsername(); // Mettre à jour le nom d'utilisateur lorsque l'utilisateur est défini
        }
    }
}
