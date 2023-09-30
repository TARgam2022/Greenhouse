import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TempComponent } from './temp/temp.component';
import { HumdComponent } from './humd/humd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NavbarComponent } from './navbar/navbar.component';
import { BrightComponent } from './bright/bright.component';
import { SoilComponent } from './soil/soil.component';
import { TempChartComponent } from './temp-chart/temp-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    TempComponent,
    HumdComponent,
    NavbarComponent,
    BrightComponent,
    SoilComponent,
    TempChartComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
