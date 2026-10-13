import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
 

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Récupération des données pour le diagramme en donut
  }}