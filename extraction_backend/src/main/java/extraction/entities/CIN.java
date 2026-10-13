package extraction.entities;

import java.util.Date;

import jakarta.persistence.Entity;

@Entity
public class CIN extends Document {
    private String cinNumber;
    private String fullName;
    private String dateOfBirth;
    private String nationality;
    private String expiryDate;
    private String issueDate;
    private double cinNumberScore;
    private double fullNameScore;
    private double dateOfBirthScore;
    private double nationalityScore;
    private double expiryDateScore;
    private double issueDateScore;

    public CIN() {
    }

    public CIN(Long documentId, String fileName, Date extractionDate, User user, String cinNumber, String fullName, String dateOfBirth, String nationality, String expiryDate, String issueDate, double cinNumberScore, double fullNameScore, double dateOfBirthScore, double nationalityScore, double expiryDateScore, double issueDateScore) {
        super(documentId, fileName, extractionDate, user);
        this.cinNumber = cinNumber;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.expiryDate = expiryDate;
        this.issueDate = issueDate;
        this.cinNumberScore = cinNumberScore;
        this.fullNameScore = fullNameScore;
        this.dateOfBirthScore = dateOfBirthScore;
        this.nationalityScore = nationalityScore;
        this.expiryDateScore = expiryDateScore;
        this.issueDateScore = issueDateScore;
    }

    public String getCinNumber() {
        return cinNumber;
    }

    public void setCinNumber(String cinNumber) {
        this.cinNumber = cinNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public double getCinNumberScore() {
        return cinNumberScore;
    }

    public void setCinNumberScore(double cinNumberScore) {
        this.cinNumberScore = cinNumberScore;
    }

    public double getFullNameScore() {
        return fullNameScore;
    }

    public void setFullNameScore(double fullNameScore) {
        this.fullNameScore = fullNameScore;
    }

    public double getDateOfBirthScore() {
        return dateOfBirthScore;
    }

    public void setDateOfBirthScore(double dateOfBirthScore) {
        this.dateOfBirthScore = dateOfBirthScore;
    }

    public double getNationalityScore() {
        return nationalityScore;
    }

    public void setNationalityScore(double nationalityScore) {
        this.nationalityScore = nationalityScore;
    }

    public double getExpiryDateScore() {
        return expiryDateScore;
    }

    public void setExpiryDateScore(double expiryDateScore) {
        this.expiryDateScore = expiryDateScore;
    }

    public double getIssueDateScore() {
        return issueDateScore;
    }

    public void setIssueDateScore(double issueDateScore) {
        this.issueDateScore = issueDateScore;
    }
}
