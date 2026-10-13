import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { finalize } from 'rxjs';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  

  constructor(
    public router: Router,
   
   

  ) {}
 
  ngOnInit(): void {
  
 
}
}