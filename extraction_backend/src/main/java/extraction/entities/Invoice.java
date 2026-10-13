package extraction.entities;
import java.util.Date;

import jakarta.persistence.Entity;

@Entity
public class Invoice extends Document {

    private String invoiceNumber;
    private String invoiceDate;
    private String totalAmount;
    private String vendorName;
    private String customerAddress;
    
    // Scores for each field
    private Double invoiceNumberScore;
    private Double invoiceDateScore;
    private Double totalAmountScore;
    private Double vendorNameScore;
    private Double customerAddressScore;

    public Invoice() {
    }

    public Invoice(Long documentId, String fileName, Date extractionDate, User user, String invoiceNumber, String invoiceDate, String totalAmount, String vendorName, String customerAddress,
                   Double invoiceNumberScore, Double invoiceDateScore, Double totalAmountScore, Double vendorNameScore, Double customerAddressScore) {
        super(documentId, fileName, extractionDate, user);
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.totalAmount = totalAmount;
        this.vendorName = vendorName;
        this.customerAddress = customerAddress;
        this.invoiceNumberScore = invoiceNumberScore;
        this.invoiceDateScore = invoiceDateScore;
        this.totalAmountScore = totalAmountScore;
        this.vendorNameScore = vendorNameScore;
        this.customerAddressScore = customerAddressScore;
    }

    // Getters and setters for Invoice specific fields
    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }
    
    // Getters and setters for scores
    public Double getInvoiceNumberScore() {
        return invoiceNumberScore;
    }

    public void setInvoiceNumberScore(Double invoiceNumberScore) {
        this.invoiceNumberScore = invoiceNumberScore;
    }

    public Double getInvoiceDateScore() {
        return invoiceDateScore;
    }

    public void setInvoiceDateScore(Double invoiceDateScore) {
        this.invoiceDateScore = invoiceDateScore;
    }

    public Double getTotalAmountScore() {
        return totalAmountScore;
    }

    public void setTotalAmountScore(Double totalAmountScore) {
        this.totalAmountScore = totalAmountScore;
    }

    public Double getVendorNameScore() {
        return vendorNameScore;
    }

    public void setVendorNameScore(Double vendorNameScore) {
        this.vendorNameScore = vendorNameScore;
    }

    public Double getCustomerAddressScore() {
        return customerAddressScore;
    }

    public void setCustomerAddressScore(Double customerAddressScore) {
        this.customerAddressScore = customerAddressScore;
    }
}
