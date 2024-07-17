import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FormComponent } from './component/form/form.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ApresentationComponent } from "./component/apresentation/apresentation.component";
import { CardListComponent } from './component/card-list/card-list.component';
import { LegendComponent } from './component/legend/legend.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormComponent, ApresentationComponent, CardListComponent, LegendComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smartfit-test';
}
