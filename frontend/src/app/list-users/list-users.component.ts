import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styles: []
})
export class ListUsersComponent implements OnInit {
  users: User[] = []; // Initialize users array

  constructor(private userService: UserService) { }
  selectedRole: string = ''; 

  filteredUsers: User[] = [];
  filterName: string = '';
  selectedUser: User | null = null;
  ngOnInit(): void {
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
  filter() {
    if(this.filterName === ""){
      this.filteredUsers = this.users

    }
    else {


    this.filteredUsers = this.filteredUsers.filter((user) =>
      user.username.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }
}
  applyFilter() {
    // Apply the filter dynamically as the user types
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }
  loadUsers() {
    this.userService.getTousUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error loading users: ', error);
      }
    );
  }
}
