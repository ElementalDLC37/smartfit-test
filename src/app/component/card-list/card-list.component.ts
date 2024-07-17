import { Component, Input, OnInit } from '@angular/core';
import { LocationsService } from '../../service/locations.service';
import { Location } from '../../types/Location.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit {
  unitsList: Location[] = [];

  constructor(private locationsService: LocationsService) {
    locationsService.locations.subscribe(data => {
      this.unitsList = data
    })
  }

  ngOnInit(): void {
  }
}
