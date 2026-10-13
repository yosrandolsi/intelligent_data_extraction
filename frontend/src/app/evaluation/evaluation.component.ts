import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import Chart from 'chart.js/auto'; // Import de Chart.js

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {

  evaluations: any[] = [];
  doughnutChart: any; // Variable pour stocker l'instance du graphique donut
  filterType: string = '';
  recentDateFilter: boolean = false;
  oldDateFilter: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllEvaluations();
    this.filterEvaluationsByRecentDate(); // Appel de la méthode pour filtrer par date la plus récente
  }
  

  getAllEvaluations(): void {
    this.dataService.getAllEvaluations().subscribe(
      (evaluations) => {
        this.evaluations = evaluations;
        this.generateDoughnutChart(); // Appel de la méthode pour générer le graphique donut
      },
      (error) => {
        console.error('Erreur lors du chargement des évaluations:', error);
        // Gérer les erreurs de chargement des évaluations ici
      }
    );
  }

  generateDoughnutChart(): void {
    // Appel de la méthode countEvaluationNotes() pour récupérer les données sur le nombre de chaque type de note
    this.dataService.countEvaluationNotes().subscribe(
      (counts) => {
        const labels = Object.keys(counts); // Les labels sont les différents types de note
        const data = Object.values(counts); // Les données sont le nombre de chaque type de note
  
        // Définition des couleurs de fond
        const backgroundColor = [
          '#1d61a2', // Couleur pour "Excellent"
          '#d64e63', // Couleur pour les autres catégories
          '#8d9aa0',
          '#e39240',
          '#e192a0',
          '#ecbf92'
        ];
  
        // Définition des couleurs au survol
        const hoverBackgroundColor = [
          '#10517a', // Couleur pour "Excellent" au survol
          '#b43b4a',
          '#6a7479',
          '#bb7f31',
          '#bb6f7f',
          '#cf9b60'
        ];
  
        // Créer le graphique donut
        this.doughnutChart = new Chart('doughnutChart', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: backgroundColor,
              hoverBackgroundColor: hoverBackgroundColor
            }]
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des données sur le nombre de chaque type de note:', error);
        // Gérer les erreurs ici
      }
    );
  }

  filterEvaluations(): void {
    if (this.filterType === 'badToExcellent' || this.filterType === 'excellentToBad') {
      // Filtrer les évaluations en fonction des notes
      this.dataService.filterEvaluations(this.filterType).subscribe(
        (evaluations) => {
          this.evaluations = evaluations;
          this.generateDoughnutChart(); // Re-générer le graphique après le filtrage
        },
        (error) => {
          console.error('Erreur lors du filtrage des évaluations:', error);
          // Gérer les erreurs de filtrage ici
        }
      );
    } else if (this.filterType === 'recentDate') {
      // Filtrer les évaluations par date la plus récente
      this.filterEvaluationsByRecentDate();
    } else if (this.filterType === 'oldDate') {
      // Filtrer les évaluations par date la plus ancienne
      this.filterEvaluationsByOldDate();
    } else {
      console.error('Type de filtre invalide:', this.filterType);
      // Gérer les cas où le type de filtre n'est pas valide
    }
  }
  

  filterEvaluationsByRecentDate(): void {
    this.recentDateFilter = true;
    this.oldDateFilter = false;
    this.evaluations.sort((a: any, b: any) => new Date(b.extractionDate).getTime() - new Date(a.extractionDate).getTime());
    console.log("Evaluations triées par date la plus récente :", this.evaluations); // Vérification dans la console
  }
  
  filterEvaluationsByOldDate(): void {
    this.recentDateFilter = false;
    this.oldDateFilter = true;
    this.evaluations.sort((a: any, b: any) => new Date(a.extractionDate).getTime() - new Date(b.extractionDate).getTime());
  }
  
  
}
