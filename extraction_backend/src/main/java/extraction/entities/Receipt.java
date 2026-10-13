package extraction.entities;
import java.util.Date;

import jakarta.persistence.Entity;

@Entity
public class Receipt extends Document {
    private String receiptNumber;
    private String receiptDate;
    private String totalAmount;
    private String storeName;
    private String salesTax;

    // Scores for each field
    private Double receiptNumberScore;
    private Double receiptDateScore;
    private Double totalAmountScore;
    private Double storeNameScore;
    private Double salesTaxScore;

    public Receipt() {
    }

    public Receipt(Long documentId, String fileName, Date extractionDate, User user, String receiptNumber, String receiptDate, String totalAmount, String storeName, String salesTax,
                   Double receiptNumberScore, Double receiptDateScore, Double totalAmountScore, Double storeNameScore, Double salesTaxScore) {
        super(documentId, fileName, extractionDate, user);
        this.receiptNumber = receiptNumber;
        this.receiptDate = receiptDate;
        this.totalAmount = totalAmount;
        this.storeName = storeName;
        this.salesTax = salesTax;
        this.receiptNumberScore = receiptNumberScore;
        this.receiptDateScore = receiptDateScore;
        this.totalAmountScore = totalAmountScore;
        this.storeNameScore = storeNameScore;
        this.salesTaxScore = salesTaxScore;
    }

    // Getters and setters for Receipt specific fields
    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public String getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(String receiptDate) {
        this.receiptDate = receiptDate;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getSalesTax() {
        return salesTax;
    }

    public void setSalesTax(String salesTax) {
        this.salesTax = salesTax;
    }

    // Getters and setters for scores
    public Double getReceiptNumberScore() {
        return receiptNumberScore;
    }

    public void setReceiptNumberScore(Double receiptNumberScore) {
        this.receiptNumberScore = receiptNumberScore;
    }

    public Double getReceiptDateScore() {
        return receiptDateScore;
    }

    public void setReceiptDateScore(Double receiptDateScore) {
        this.receiptDateScore = receiptDateScore;
    }

    public Double getTotalAmountScore() {
        return totalAmountScore;
    }

    public void setTotalAmountScore(Double totalAmountScore) {
        this.totalAmountScore = totalAmountScore;
    }

    public Double getStoreNameScore() {
        return storeNameScore;
    }

    public void setStoreNameScore(Double storeNameScore) {
        this.storeNameScore = storeNameScore;
    }

    public Double getSalesTaxScore() {
        return salesTaxScore;
    }

    public void setSalesTaxScore(Double salesTaxScore) {
        this.salesTaxScore = salesTaxScore;
    }
}
