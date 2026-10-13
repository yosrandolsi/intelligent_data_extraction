import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOptionsDoughnut: any;
  chartOptionsBar: any;
  chartOptions: any;
  isAdmin: boolean = false;
  username: string = ''; // Ajoutez une variable pour stocker le nom d'utilisateur de l'utilisateur connecté

  constructor(private dataService: DataService, private authService: AuthService) { }
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin(); // Vérifie si l'utilisateur est un administrateur
    this.username = this.authService.loggedUser; // Récupérez le nom d'utilisateur de l'utilisateur connecté
  
    console.log('Username:', this.username); // Ajoutez cette ligne pour vérifier le nom d'utilisateur
  
    if (this.isAdmin) {
      // Si l'utilisateur est un administrateur, utilisez la logique appropriée pour les administrateurs
      this.dataService.countDocumentsByType().subscribe(documentsByType => {
        // Utiliser les données pour générer le graphique approprié pour les administrateurs
        this.chartOptionsDoughnut = this.generateCanvasJSOptionsDoughnut(0, documentsByType);
      });
      this.dataService.getSumScorePercentageByType().subscribe(scoresByType => {
        this.chartOptionsBar = this.generateCanvasJSOptionsBar(scoresByType);
      });
      // Pour les administrateurs, utilisez la méthode countDocumentsForLast7Days directement
      this.dataService.countDocumentsForLast7Days().subscribe(documentsForLast7Days => {
        this.chartOptions = this.generateCanvasJSOptionsLine(documentsForLast7Days);
        this.renderChart();
      });
    } else {
      // Si l'utilisateur n'est pas un administrateur, utilisez la logique appropriée pour les utilisateurs normaux
      this.dataService.countDocumentsByUsername(this.username).subscribe(documentsByUser => {
        // Utiliser les données pour générer le graphique approprié pour les utilisateurs normaux
        this.chartOptionsDoughnut = this.generateCanvasJSOptionsDoughnut(0, documentsByUser);
      });
      this.dataService.getSumScorePercentageByUsername(this.username).subscribe(scoresByUser => {
        this.chartOptionsBar = this.generateCanvasJSOptionsBar(scoresByUser);
      });
      // Pour les utilisateurs normaux, utilisez la méthode countDocumentsForLast7DaysByUsername avec leur username
      this.dataService.countDocumentsForLast7DaysByUsername(this.username).subscribe(documentsForLast7Days => {
        this.chartOptions = this.generateCanvasJSOptionsLine(documentsForLast7Days);
        this.renderChart();
      });
    }
  }

  
  // Autres méthodes de votre composant...

  // Autres méthodes de votre composant...

  // Autres méthodes de votre composant...

  generateCanvasJSOptionsDoughnut(totalDocuments: number, documentsByType: { [key: string]: number }): any {
    return {
      animationEnabled: true,
      title: {
        text: "Document Distribution by Type"
      },
      data: [{
        type: "doughnut",
        indexLabel: "{name}",
        dataPoints: this.convertDataForDoughnutChart(documentsByType)
      }],
      options: {
        credit: {
          enabled: false // Supprime la référence de CanvasJS
        }
      }
    };
  }

  generateCanvasJSOptionsBar(scoresByType: { [key: string]: number }): any {
    return {
        animationEnabled: true,
        title: {
            text: "Score Distribution by Type"
        },
        axisY: {
            title: "Score (%)",
            includeZero: true
        },
        data: [{
            type: "column",
            dataPoints: this.convertDataForBarChart(scoresByType)
        }],
        options: {
            credit: {
                enabled: false // Supprime la référence de CanvasJS
            }
        }
    };
}

convertDataForBarChart(scoresByType: { [key: string]: number }): { y: number, label: string }[] {
    return Object.entries(scoresByType)
        .map(([key, value]) => ({ label: key, y: parseFloat(value.toFixed(2)) }));
}

  convertDataForDoughnutChart(data: { [key: string]: number }): { y: number, name: string }[] {
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1]) // Trie par valeur décroissante
      .map(([key, value]) => ({ name: key, y: value }));
  }

 
  generateCanvasJSOptionsLine(documentsForLast7Days: any): any {
    return {
      animationEnabled: true,
      title: {
        text: "Document Count for Last 7 Days"
      },
      axisX: {
        title: "Date"
      },
      axisY: {
        title: "Document Count"
      },
      data: Object.keys(documentsForLast7Days).map(type => ({
        type: "line",
        showInLegend: true,
        name: type,
       // Utilisez la couleur correspondante au type de document
        dataPoints: Object.entries(documentsForLast7Days[type]).map(([date, count]) => ({
          x: new Date(date),
          y: count as number
        }))
      }))
    };
  }

  renderChart() {
    // Render le chart ici
    // Utilisez les options du chart
  }

}



