import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private route: ActivatedRoute, public router: Router, private userService: UserService) {}
  
  selectedRole: string = ''; 
  users: User[] = [];
  filteredUsers: User[] = [];
  filterName: string = '';
  selectedUser: User | null = null;
  totalUsers: number = 0; 
  errorMessage: string | null = null;

  // Local state to track role changes
  addedRoles: string[] = [];
  removedRoles: string[] = [];

  ngOnInit(): void {
    this.userService.listeUsers().subscribe(
      (Response) => {
        this.users = Response.filter(user => user.isActive);
        this.applyFilter();
        this.totalUsers = this.users.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs : ', error);
      }
    );
  }
  
  applyFilter() {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  filter() {
    if(this.filterName === ""){
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(this.filterName.toLowerCase())
      );
    }
  }

  goToDetail(userId: number) {
    this.router.navigate(['/detail', userId]);
  }

  goToInscriptionPage() {
    this.router.navigate(['/inscription']);
  }

  toggleAddRoleFormForUser(user: User): void {
    if (this.selectedUser === user) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
      this.addedRoles = [];
      this.removedRoles = [];
    }
  }

  cancelAddRole() {
    this.selectedUser = null;
    this.addedRoles = [];
    this.removedRoles = [];
  }

  addRoleToUser(user: User, roleName: string): void {
    if (user.roles.find(role => role.role === roleName) || this.addedRoles.includes(roleName)) {
      this.errorMessage = 'Error adding role: This user already has this role.';
      return;
    }
    this.addedRoles.push(roleName);
    this.removedRoles = this.removedRoles.filter(role => role !== roleName);
    this.clearError();
  }

  removeRoleFromUser(user: User, roleName: string): void {
    if (!user.roles.find(role => role.role === roleName) && !this.addedRoles.includes(roleName)) {
      this.errorMessage = 'Error removing role: This user does not have this role.';
      return;
    }
    this.removedRoles.push(roleName);
    this.addedRoles = this.addedRoles.filter(role => role !== roleName);
    this.clearError();
  }

  saveRoleChanges(): void {
    if (!this.selectedUser) {
      return;
    }
    const user = this.selectedUser;

    // Add roles
    this.addedRoles.forEach(roleName => {
      this.userService.addRoleToUser(user.username, roleName).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.applyFilter();
        },
        (error) => {
          console.error('Error adding role:', error);
        }
      );
    });

    // Remove roles
    this.removedRoles.forEach(roleName => {
      this.userService.removeRoleFromUser(user.username, roleName).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.applyFilter();
        },
        (error) => {
          console.error('Error removing role:', error);
        }
      );
    });

    this.selectedUser = null;
    this.addedRoles = [];
    this.removedRoles = [];
  }

  cancelRoleChanges(): void {
    this.selectedUser = null;
    this.addedRoles = [];
    this.removedRoles = [];
  }

  clearError(): void {
    this.errorMessage = null;
  }
}
