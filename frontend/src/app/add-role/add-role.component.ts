import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styles: []
})
export class AddRoleComponent {
  @Input() user!: User;
 
  selectedRole: string = ''; 
  constructor(private userService: UserService) { }

  submitRole(): void {
    // Vérifiez si selectedRole est défini
    if (!this.selectedRole) {
      console.error('No role selected');
      return;
    }

    // Assurez-vous que user contient un nom d'utilisateur valide
    if (!this.user || !this.user.username) {
      console.error('Invalid user');
      return;
    }

    // Effectuer la requête d'ajout de rôle en utilisant le nom d'utilisateur et le rôle sélectionné
  }
}
