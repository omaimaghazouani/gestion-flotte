import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { VehiculeComponent } from './vehicule/vehicule/vehicule.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddVehiculeComponent } from './vehicule/add-vehicule/add-vehicule.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    CommonModule,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    AddVehiculeComponent,
    LoginComponent,
    DashboardAdminComponent,

    //VehiculeComponent,
    //AddVehiculeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    FormsModule   ,
    MatDialogModule,
    MatButtonModule,
    //MatDialogModule
    //VehiculeModule
   // RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
