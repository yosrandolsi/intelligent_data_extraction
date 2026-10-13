import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-passeport-historique',
  templateUrl: './passeport-historique.component.html',
  styleUrls: ['./passeport-historique.component.css']
})
export class PasseportHistoriqueComponent implements OnInit {
  passeportsByExtractionDate: { date: Date, passports: any[] }[] = [];
  isAdmin: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadPasseports();
  }

  loadPasseports(): void {
    this.dataService.getAllPasseport().subscribe(
      (data: any[]) => {
        let sortedPasseports = data.sort((a, b) => new Date(b.extractionDate).getTime() - new Date(a.extractionDate).getTime());
        
        if (!this.isAdmin) {
          const currentUser = this.authService.loggedUser;
          sortedPasseports = sortedPasseports.filter(passport => passport.username === currentUser);
        }

        const passeportsGroupedByDate = this.groupPasseportsByExtractionDate(sortedPasseports);
        this.passeportsByExtractionDate = Object.values(passeportsGroupedByDate);
      },
      (error) => {
        console.error('Failed to load passports:', error);
      }
    );
  }

  groupPasseportsByExtractionDate(passeports: any[]): { [key: string]: { date: Date, passports: any[] } } {
    const groupedPasseports: { [key: string]: { date: Date, passports: any[] } } = {};
    passeports.forEach(passport => {
      const extractionDateKey = new Date(passport.extractionDate).toDateString();
      if (!groupedPasseports[extractionDateKey]) {
        groupedPasseports[extractionDateKey] = {
          date: new Date(passport.extractionDate),
          passports: []
        };
      }
      groupedPasseports[extractionDateKey].passports.push(passport);
    });
    return groupedPasseports;
  }
}
