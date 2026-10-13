import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  constructor(private route: ActivatedRoute, public router: Router, private userService: UserService) {}

  users: User[] = [];
  filteredUsers: User[] = [];
  filterName: string = '';
  user: Partial<User> = {};
  isEditMode: boolean = false;
  showConfirmation: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  user_id: any;
  userToActivate: User | null = null;
  showActivationConfirmation: boolean = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  applyFilter() {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  goToDetail(userId: number) {
    this.router.navigate(['/detail', userId]);
  }

  filter() {
    if (this.filterName === "") {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(this.filterName.toLowerCase())
      );
    }
  }

  goToInscriptionPage() {
    this.router.navigate(['/inscription']);
  }

  activateUser(user: User) {
    this.userToActivate = user;
    // Afficher la boîte de dialogue de confirmation
    this.showActivationConfirmation = true;
  }
  
  cancelActivation() {
    this.userToActivate = null;
    this.showActivationConfirmation = false; // Cacher la boîte de dialogue de confirmation
  }

  confirmActivation() {
    if (this.userToActivate) {
      this.userToActivate.isActive = true;
      this.userService.updateUser(this.userToActivate).subscribe(updatedUser => {
        console.log('Utilisateur activé avec succès :', updatedUser);
        // Réinitialiser les informations de l'utilisateur après activation réussie
        this.userToActivate = null;
        this.showActivationConfirmation = false; // Cacher la boîte de dialogue de confirmation
      }, error => {
        console.error('Erreur lors de l\'activation de l\'utilisateur :', error);
      });
    }
  }
 

  loadUsers() {
    this.userService.listeUsers().subscribe(
      (Response) => {
        this.users = Response;
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );
  }

  confirmSupprimer(userId: number): void {
    this.showConfirmation = true;
    this.user_id = userId; // Stocke l'ID de l'utilisateur pour la suppression
  }
  
  cancelDelete(): void {
    this.showConfirmation = false;
  }

  confirmDelete(): void {
    this.showConfirmation = false;
    this.supprimer();
  }

  supprimer() {
    this.userService.deleteUser(this.user_id).subscribe(
      () => {
        this.showSuccessMessage = true; // Afficher la carte de suppression réussie
        this.loadUsers(); // Actualiser la liste des utilisateurs après suppression
        setTimeout(() => {
          this.router.navigate(['/validation']);
        }, 2000); // Rediriger après 2 secondes
      },
      () => {
        this.showErrorMessage = true; // Afficher la carte d'erreur de suppression
      }
    );
  }

  deleteSuccess() {
    this.showSuccessMessage = true;
  }
  
  // Méthode pour la suppression erronée
  deleteError() {
    this.showErrorMessage = true;
  }

  dismissSuccessMessage() {
    this.showSuccessMessage = false;
  }

  dismissErrorMessage() {
    // Implémentez le code que vous souhaitez exécuter lorsque le message d'erreur est rejeté
    // Par exemple, masquer le message d'erreur
    this.showErrorMessage = false;
  }
}
