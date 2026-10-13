import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filterName: string = '';

  constructor(private userService: UserService,private route: ActivatedRoute,public router: Router,) {}

  ngOnInit(): void {
    let admin : String ='admin';
    if (!sessionStorage.getItem('login')) {
      this.router.navigate(['/connexion']);
    }
    if (admin !== sessionStorage.getItem('userRole')) {
      this.router.navigate(['/error']);
    }


    this.userService.getTousUsers().subscribe(
      (Response) => {
        this.users = Response;
        this.filteredUsers = this.users;
      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );

  }

    applyFilter() {
    // Apply the filter dynamically as the user types
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }
}
