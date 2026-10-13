package extraction.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Document implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long documentId;
    private String fileName;
    @Column(name = "extraction_date")
    private Date extractionDate = new Date();
    @Column(name = "username") // Ajout d'une colonne pour stocker le nom d'utilisateur
    private String username; // Propriété pour stocker le nom d'utilisateur

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Document() {
    }

    public Document(Long documentId, String fileName, Date extractionDate, User user) {
        super();
        this.documentId = documentId;
        this.fileName = fileName;
        this.extractionDate = extractionDate;
        this.user = user;
        if(user != null) {
            this.username = user.getUsername(); // Attribuer le nom d'utilisateur de l'utilisateur associé
        }
    }

    public Date getExtractionDate() {
        return extractionDate;
    }

    public void setExtractionDate(Date extractionDate) {
        this.extractionDate = extractionDate;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        if(user != null) {
            this.username = user.getUsername(); // Mettre à jour le nom d'utilisateur lorsque l'utilisateur est défini
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
