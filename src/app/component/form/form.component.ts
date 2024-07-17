import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocationsService } from '../../service/locations.service';
import { Location } from '../../types/Location.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  result: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private locationService: LocationsService) {
    this.locationService.locations.subscribe(data => {
      this.result = data
    })
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      openSaturday: false,
      openSunday: false,
      showClosed: true
    })

    this.locationService
    .getLocations(
      this.formGroup.controls['hour'].value,
      this.formGroup.controls['openSaturday'].value,
      this.formGroup.controls['openSunday'].value,
      this.formGroup.controls['showClosed'].value
    )
  }

  onSubmit(): void {
    this.locationService
    .getLocations(
      this.formGroup.controls['hour'].value,
      this.formGroup.controls['openSaturday'].value,
      this.formGroup.controls['openSunday'].value,
      this.formGroup.controls['showClosed'].value
    )
  }

  onClean(): void {
    this.formGroup.reset();
  }

}
