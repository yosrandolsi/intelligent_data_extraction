export class Invoice {
  constructor(
    public saveInvoice: any,
    public invoiceNumber: any,
    public invoiceDate: any,
    public totalAmount: any,
    public vendorName: any,
    public customerAddress: any,
    public fileName: any, // Ajout du nom de fichier
    public extractionDate: any // Ajout de la date d'extraction
  ) {}
}
