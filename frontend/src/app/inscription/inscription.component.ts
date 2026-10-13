import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  formSubmitted: boolean = false;
  myForm!: FormGroup;

  err = "";

  registrationSuccess: boolean = false;
  showErrorCard: boolean = false;
  showErrorCard2: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
      tel: ["", [Validators.required]],
      address: ["", [Validators.required]]
    });
  }

  redirectToLoginPage() {
    this.router.navigate([""]);
  }

  onRegister() {
    this.formSubmitted = true;

    if (this.myForm.invalid) {
      console.error("Formulaire invalide. Veuillez remplir tous les champs.");
      return;
    }

    if (this.myForm.value.password !== this.myForm.value.confirmPassword) {
      console.error("Les mots de passe ne correspondent pas.");
      this.myForm.controls['confirmPassword'].setErrors({ mismatch: true });
      return;
    }

    this.user = this.myForm.value;

    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        this.registrationSuccess = true;
      },
      error: (err: any) => {
        if (err.error.errorCode === "USER_EMAIL_ALREADY_EXISTS") {
          this.showErrorCard = true; 
        } else if (err.error.errorCode === "USER_USERNAME_ALREADY_EXISTS") {
          this.showErrorCard2 = true;
        } else {
          this.err = "Une erreur s'est produite lors de l'inscription";
          this.showErrorCard = false;
        }
      },
    });
  }

  cancel() {
    this.showErrorCard = false;
    this.showErrorCard2 = false;
  }

}
