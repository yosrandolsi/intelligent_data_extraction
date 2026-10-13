package extraction.entities;

import java.util.Date;
import jakarta.persistence.Entity;

@Entity
public class Passeport extends Document {
    private String passportNumber;
    private String givenName;
    private String surname;
    private String nationality;
    private String dateOfBirth;
    private String issueDate;
    private String expiryDate;
    private String sex;
    private double passportNumberScore;
    private double givenNameScore;
    private double surnameScore;
    private double nationalityScore;
    private double dateOfBirthScore;
    private double issueDateScore;
    private double expiryDateScore;
    private double sexScore;

    public Passeport() {
    }

    public Passeport(Long documentId, String fileName, Date extractionDate, User user, String passportNumber, String givenName, String surname, String nationality, String dateOfBirth, String issueDate, String expiryDate, String sex) {
        super(documentId, fileName, extractionDate, user);
        this.passportNumber = passportNumber;
        this.givenName = givenName;
        this.surname = surname;
        this.nationality = nationality;
        this.dateOfBirth = dateOfBirth;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
        this.sex = sex;
    }

    // Getters and setters for passport specific fields
    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    // Getters and setters for passport specific score fields

    public double getPassportNumberScore() {
        return passportNumberScore;
    }

    public void setPassportNumberScore(double passportNumberScore) {
        this.passportNumberScore = passportNumberScore;
    }

    public double getGivenNameScore() {
        return givenNameScore;
    }

    public void setGivenNameScore(double givenNameScore) {
        this.givenNameScore = givenNameScore;
    }

    public double getSurnameScore() {
        return surnameScore;
    }

    public void setSurnameScore(double surnameScore) {
        this.surnameScore = surnameScore;
    }

    public double getNationalityScore() {
        return nationalityScore;
    }

    public void setNationalityScore(double nationalityScore) {
        this.nationalityScore = nationalityScore;
    }

    public double getDateOfBirthScore() {
        return dateOfBirthScore;
    }

    public void setDateOfBirthScore(double dateOfBirthScore) {
        this.dateOfBirthScore = dateOfBirthScore;
    }

    public double getIssueDateScore() {
        return issueDateScore;
    }

    public void setIssueDateScore(double issueDateScore) {
        this.issueDateScore = issueDateScore;
    }

    public double getExpiryDateScore() {
        return expiryDateScore;
    }

    public void setExpiryDateScore(double expiryDateScore) {
        this.expiryDateScore = expiryDateScore;
    }

    public double getSexScore() {
        return sexScore;
    }

    public void setSexScore(double sexScore) {
        this.sexScore = sexScore;
    }
}
