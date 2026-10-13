import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-driving-licence-historique',
  templateUrl: './driving-licence-historique.component.html',
  styleUrls: ['./driving-licence-historique.component.css']
})
export class DrivingLicenceHistoriqueComponent implements OnInit {
  drivingLicencesByExtractionDate: { date: Date, licences: any[] }[] = [];
  isAdmin: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadDrivingLicences();
  }

  loadDrivingLicences(): void {
    this.dataService.getAllDrivingLicence().subscribe(
      (data: any[]) => {
        let sortedLicences = data.sort((a, b) => new Date(b.extractionDate).getTime() - new Date(a.extractionDate).getTime());
        
        if (!this.isAdmin) {
          const currentUser = this.authService.loggedUser;
          sortedLicences = sortedLicences.filter(licence => licence.username === currentUser);
        }

        const licencesGroupedByDate = this.groupLicencesByExtractionDate(sortedLicences);
        this.drivingLicencesByExtractionDate = Object.values(licencesGroupedByDate);
      },
      (error) => {
        console.error('Failed to load driving licences:', error);
      }
    );
  }

  groupLicencesByExtractionDate(licences: any[]): { [key: string]: { date: Date, licences: any[] } } {
    const groupedLicences: { [key: string]: { date: Date, licences: any[] } } = {};
    licences.forEach(licence => {
      const extractionDateKey = new Date(licence.extractionDate).toDateString();
      if (!groupedLicences[extractionDateKey]) {
        groupedLicences[extractionDateKey] = {
          date: new Date(licence.extractionDate),
          licences: []
        };
      }
      groupedLicences[extractionDateKey].licences.push(licence);
    });
    return groupedLicences;
  }
}
