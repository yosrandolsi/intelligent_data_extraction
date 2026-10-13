import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  id: any;
  role: any;
  user_id: any;
  user: Partial<User> = {};
  selectedItem: string = '';

  constructor(public router: Router, public authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    this.role = sessionStorage.getItem('userRole');
    let id = Number(localStorage.getItem('id'));
    this.userService.getUserById(id).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (error: any) => {
        console.error(error);
        alert('User Not Found');
      }
    });
  
    // Détecter les changements d'itinéraire
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedItem(); // Mettre à jour l'élément sélectionné à chaque changement d'itinéraire
      }
    });
  
    // Mettre à jour l'élément sélectionné lors de l'initialisation du composant
    this.updateSelectedItem();
  }
  

  // Méthode pour mettre à jour l'élément sélectionné en fonction du chemin actuel
  updateSelectedItem() {
    const currentRoute = this.router.url.split('/')[1];
    if (['InvoiceHistorique', 'CINHistorique', 'PasseportHistorique', 'DrivingHistorique', 'ReceiptHistorique'].includes(currentRoute)) {
      this.selectedItem = 'Historique';
    } else if (currentRoute === 'detail') {
      // Si le chemin actuel est 'detail', vérifiez également si le paramètre id est présent
      const id = this.router.url.split('/')[2]; // Récupérer le deuxième segment du chemin URL
      if (id) {
        this.selectedItem = 'listUsers';
      }
    } else {
      this.selectedItem = currentRoute;
    }
  }
  

  onLogout() {
    this.authService.logout();
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }
}
