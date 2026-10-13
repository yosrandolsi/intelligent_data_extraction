import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./detail.css']
})
export class EmployeedetailComponent implements OnInit {
  user: Partial<User> = {};
  isEditMode: boolean = false;
  showConfirmation: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  

  user_id: any;
  constructor(public authService : AuthService,private route: ActivatedRoute,public router: Router, private userService: UserService) {}




    ngOnInit() {
      // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
      this.route.params.subscribe(params => {
        const userId = params['id'];
        if (userId) {
          this.userService.getUserById(userId).subscribe(
            (data: User) => {
              this.user = data;
            },
            error => {
              console.error(error);
              alert('Verifier les données');
            }
          );
        } else {
          console.error('User ID not found in route parameters');
        }
      });
    }
    


  

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }


  onSubmit() {
    const userId = this.user?.id;
  
    if (userId && this.user) {
      // Créez un objet `Partial<User>` contenant les modifications de l'utilisateur
      const userChanges: Partial<User> = {
        id: userId, // Inclure l'ID de l'utilisateur dans les modifications
        
        name: this.user.name,
        username: this.user.username,
        lastName: this.user.lastName,
        matricule: this.user.matricule,
        email: this.user.email,
        tel: this.user.tel,
        
      };
  
      
      this.userService.updateUser(userChanges).subscribe(
        (updatedUser: User) => {
          this.user = updatedUser;
          this.isEditMode = false;
          this.router.navigate(['/detail', userId]); // Passer l'ID de l'utilisateur comme paramètre d'URL
        },
        error => {
          console.error(error);
          alert('Erreur lors de la sauvegarde des modifications');
        }
      );
    } else {
      alert('User ID not found or user data missing.');
    }
  }
  
  

  /*confirmSupprimer(): void {
    const isConfirmed = window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?');

    if (isConfirmed) {
      this.supprimer();
    }
  }*/

  confirmSupprimer(): void {
    this.showConfirmation = true;
  }

  cancelDelete(): void {
    this.showConfirmation = false;
  }


  supprimer() {
    this.userService.deleteUser(this.user.id).subscribe(
      () => {
        this.showSuccessMessage = true; // Afficher la carte de suppression réussie
        setTimeout(() => {
          this.showSuccessMessage = false; // Masquer la carte de succès après 3 secondes
          this.router.navigate(['/listUsers']); // Rediriger vers le composant de liste
        }, 2000); // Attendre 3 secondes avant de rediriger
      },
      () => {
        this.showErrorMessage = true; // Afficher la carte d'erreur de suppression
      }
    );
  }
  
  confirmDelete(): void {
    this.showConfirmation = false;
    this.supprimer();
  }
  
  
  
  

  find(formemploye: NgForm) {
    let matriculeemp = formemploye.value['matriculeemp'];

    if (matriculeemp) {
      this.userService.getUserByMatricule(matriculeemp).subscribe(
        (data) => {
          this.user = data;
        },
        error => {
          console.error(error);
          alert('Aucun employé avec la matricule ' + matriculeemp);
        }
      );
    } else {
      alert('Aucun employé avec la matricule ' + matriculeemp);
    }
  }

  goBack() {
    // Utilisez la méthode navigateByUrl pour rediriger vers l'interface de liste
    this.router.navigateByUrl('/listUsers');
  }
  deleteSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.router.navigate(['/listUsers']); // Rediriger vers le composant de liste après 5 secondes
    }); // Rediriger après 5 secondes
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
