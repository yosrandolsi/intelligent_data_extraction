import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-receipt-historique',
  templateUrl: './receipt-historique.component.html',
  styleUrls: ['./receipt-historique.component.css']
})
export class ReceiptHistoriqueComponent implements OnInit {
  receiptsByExtractionDate: { date: Date, receipts: any[] }[] = [];
  isAdmin: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadReceipts();
  }

  loadReceipts(): void {
    this.dataService.getAllReceipt().subscribe(
      (data: any[]) => {
        let sortedReceipts = data.sort((a, b) => new Date(b.extractionDate).getTime() - new Date(a.extractionDate).getTime());
        
        if (!this.isAdmin) {
          const currentUser = this.authService.loggedUser;
          sortedReceipts = sortedReceipts.filter(receipt => receipt.username === currentUser);
        }

        this.receiptsByExtractionDate = this.groupReceiptsByExtractionDate(sortedReceipts);
      },
      (error) => {
        console.error('Failed to load receipts:', error);
      }
    );
  }

  groupReceiptsByExtractionDate(receipts: any[]): { date: Date, receipts: any[] }[] {
    const groupedReceipts: { date: Date, receipts: any[] }[] = [];

    receipts.forEach(receipt => {
      const extractionDate = new Date(receipt.extractionDate).toDateString();
      const existingGroup = groupedReceipts.find(group => new Date(group.date).toDateString() === extractionDate);

      if (existingGroup) {
        existingGroup.receipts.push(receipt);
      } else {
        groupedReceipts.push({ date: new Date(receipt.extractionDate), receipts: [receipt] });
      }
    });

    return groupedReceipts;
  }
}
