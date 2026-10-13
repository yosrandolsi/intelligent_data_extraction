package extraction.entities;

import java.util.Date;

import jakarta.persistence.Entity;

@Entity
public class DrivingLicence extends Document {
    private String licenceNumber;
    private String name;
    private String dateOfBirth;
    private String nationality;
    private String expiryDate;
    private String issueDate;
    private double licenceNumberScore;
    private double nameScore;
    private double dateOfBirthScore;
    private double nationalityScore;
    private double expiryDateScore;
    private double issueDateScore;

    public DrivingLicence() {
    }

    public DrivingLicence(Long documentId, String fileName, Date extractionDate, User user, String licenceNumber, String name, String dateOfBirth, String nationality, String expiryDate, String issueDate, double licenceNumberScore, double nameScore, double dateOfBirthScore, double nationalityScore, double expiryDateScore, double issueDateScore) {
        super(documentId, fileName, extractionDate, user);
        this.licenceNumber = licenceNumber;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.expiryDate = expiryDate;
        this.issueDate = issueDate;
        this.licenceNumberScore = licenceNumberScore;
        this.nameScore = nameScore;
        this.dateOfBirthScore = dateOfBirthScore;
        this.nationalityScore = nationalityScore;
        this.expiryDateScore = expiryDateScore;
        this.issueDateScore = issueDateScore;
    }

    public String getLicenceNumber() {
        return licenceNumber;
    }

    public void setLicenceNumber(String licenceNumber) {
        this.licenceNumber = licenceNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public double getLicenceNumberScore() {
        return licenceNumberScore;
    }

    public void setLicenceNumberScore(double licenceNumberScore) {
        this.licenceNumberScore = licenceNumberScore;
    }

    public double getNameScore() {
        return nameScore;
    }

    public void setNameScore(double nameScore) {
        this.nameScore = nameScore;
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
