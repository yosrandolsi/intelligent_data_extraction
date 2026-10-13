import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user = new User();
  message: string = "";
  showErrorCard: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
        next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.getUser();
        },
        error: (err: HttpErrorResponse) => {
            if (err.status === 400 && err.error.errorCode === 'INCORRECT_PASSWORD') {
                console.log("Erreur 400 - Mot de passe incorrect.");
                this.message = "Mot de passe incorrect.";
            } else if (err.status === 403) {
                console.log("Erreur 403 - Compte bloqué.");
                this.message = "Compte bloqué.";
            } else {
                console.log("Erreur inattendue:", err);
                this.message = "Une erreur s'est produite lors de la connexion.";
            }
            this.showErrorCard = true;
            console.log("Error:", err);
        }
    });
}

cancel() {
  this.showErrorCard = false; // Cacher la carte
}
  getUser() {
    this.userService.getByUsername(this.authService.loggedUser).subscribe({
      next: (data) => {
        if (!data.isActive) {
          console.log("Compte bloqué.");
          this.message = "Compte bloqué.";
          this.showErrorCard = true;
        } else {
          localStorage.setItem('id', data.id);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
 
}
