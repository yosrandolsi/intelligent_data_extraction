import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cinhistorique',
  templateUrl: './cinhistorique.component.html',
  styleUrls: ['./cinhistorique.component.css']
})
export class CINHistoriqueComponent implements OnInit {
  cinByExtractionDate: { date: Date, cinRecords: any[] }[] = [];
  isAdmin: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCIN();
    this.isAdmin = this.authService.isAdmin();
  }

  loadCIN(): void {
    this.dataService.getAllCIN().subscribe(
      (data: any[]) => {
        let sortedCIN = data.sort((a, b) => new Date(b.extractionDate).getTime() - new Date(a.extractionDate).getTime());
        
        if (!this.isAdmin) {
          // Filtrer les données pour un utilisateur régulier
          const currentUser = this.authService.loggedUser;
          sortedCIN = sortedCIN.filter(cin => cin.username === currentUser);
        }
  
        // Grouper les enregistrements CIN par date d'extraction
        this.cinByExtractionDate = this.groupCINByExtractionDate(sortedCIN);
      },
      (error) => {
        console.error('Failed to load CIN records:', error);
      }
    );
  }
  

  groupCINByExtractionDate(cinRecords: any[]): { date: Date, cinRecords: any[] }[] {
    const groupedCIN: { date: Date, cinRecords: any[] }[] = [];

    cinRecords.forEach(cin => {
      const extractionDate = new Date(cin.extractionDate).toDateString();
      const existingGroup = groupedCIN.find(group => new Date(group.date).toDateString() === extractionDate);

      if (existingGroup) {
        existingGroup.cinRecords.push(cin);
      } else {
        groupedCIN.push({ date: new Date(cin.extractionDate), cinRecords: [cin] });
      }
    });

    return groupedCIN;
  }
}
