import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-invoice-historique',
  templateUrl: './invoice-historique.component.html',
  styleUrls: ['./invoice-historique.component.css']
})
export class InvoiceHistoriqueComponent implements OnInit {
  invoicesByExtractionDate: { date: Date, invoices: any[] }[] = [];
  isAdmin: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router // Injectez le service Router
  ) { }

  ngOnInit(): void {
    this.loadInvoices();
    this.isAdmin = this.authService.isAdmin(); // Vérifiez si l'utilisateur est un administrateur
  }

  loadInvoices(): void {
    this.dataService.getAllInvoices().subscribe(
      (data: any[]) => {
        if (this.isAdmin) {
          this.displayAllInvoices(data);
        } else {
          this.displayUserInvoices(data);
        }
      },
      (error) => {
        console.error('Failed to load invoices:', error);
      }
    );
  }

  displayAllInvoices(invoices: any[]): void {
    // Afficher toutes les factures sans filtrage
    const sortedInvoices = invoices.sort((a, b) => new Date(b.extractionDate).getTime() - new Date(a.extractionDate).getTime());
    const invoicesGroupedByDate = this.groupInvoicesByExtractionDate(sortedInvoices);
    this.invoicesByExtractionDate = Object.values(invoicesGroupedByDate);
  }

  displayUserInvoices(invoices: any[]): void {
    // Afficher uniquement les factures de l'utilisateur connecté
    const currentUser = this.authService.loggedUser;
    const userInvoices = invoices.filter(invoice => invoice.username === currentUser);
    const invoicesGroupedByDate = this.groupInvoicesByExtractionDate(userInvoices);
    this.invoicesByExtractionDate = Object.values(invoicesGroupedByDate);
  }

  groupInvoicesByExtractionDate(invoices: any[]): { [key: string]: { date: Date, invoices: any[] } } {
    const groupedInvoices: { [key: string]: { date: Date, invoices: any[] } } = {};
    invoices.forEach(invoice => {
      const extractionDateKey = new Date(invoice.extractionDate).toDateString();
      if (!groupedInvoices[extractionDateKey]) {
        groupedInvoices[extractionDateKey] = {
          date: new Date(invoice.extractionDate),
          invoices: []
        };
      }
      groupedInvoices[extractionDateKey].invoices.push(invoice);
    });
    return groupedInvoices;
  }

  goBack(): void {
    this.router.navigate(['/Historique']); // Utilisez le router pour naviguer vers /historique
  }
}
