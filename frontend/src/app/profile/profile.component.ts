import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  user: Partial<User> = {};
  isEditMode: boolean = false;
  profileImage: string = 'assets/images/user.jpg'; // Chemin de l'image par défaut
  isImageBlurred: boolean = false; 
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    let id = Number(localStorage.getItem('id'));
    this.userService.getUserById(id).subscribe({
      next: (data: User) => {
        this.user = data;
        // Charger l'image de profil s'il existe
        if (this.user.profileImg) {
          this.profileImage = this.user.profileImg;
        }
      },
      error: (error: any) => {
        console.error(error);
        alert('User Not Found');
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit() {
    const userId = this.user?.id;
  
    if (userId && this.user) {
      const userChanges: Partial<User> = {
        id: userId,
        name: this.user.name,
        username: this.user.username,
        lastName: this.user.lastName,
        matricule: this.user.matricule,
        email: this.user.email,
        tel: this.user.tel,
        address: this.user.address,
        profileImg: this.profileImage // Cette fois-ci, profileImg contiendra la base64 de l'image
      };
  
      // Supprimer l'ancienne image par défaut s'il existe
      if (this.user.profileImg === 'assets/images/user.png') {
        delete userChanges.profileImg;
      }
  
      // Mettre à jour l'utilisateur avec la méthode updateUser
      this.userService.updateUser(userChanges).subscribe(
        (updatedUser: User) => {
          this.user = updatedUser;
          this.isEditMode = false;
          this.toastr.success('Profile updated successfully!', 'Success');
        },
        error => {
          console.error(error);
          this.toastr.error('Error updating profile. Please try again.', 'Error');
        }
      );
    } else {
      alert('User ID not found or user data missing.');
    }
  }
  

  // Méthode appelée lorsque l'utilisateur sélectionne une nouvelle image de profil
  onImageChange(event: any) {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        // Lorsque la lecture du fichier est terminée, e.target.result contient les données au format base64
        this.profileImage = e.target.result;
      };
  
      // Lire le contenu du fichier en tant que URL de données (base64)
      reader.readAsDataURL(file);
    }
  }
  makeImageBlur() {
    this.isImageBlurred = true; // Mettre à jour l'état du flou de l'image
  }

  removeImageBlur() {
    this.isImageBlurred = false; // Mettre à jour l'état du flou de l'image
  }
  
}
