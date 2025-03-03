import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiculeComponent } from './vehicule/vehicule/vehicule.component';
import { LoginComponent } from './login/login.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
 {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
 {path: 'dashboard', component: DashboardComponent},
 { path: 'vehicule', component: VehiculeComponent },
 { path: 'login', component: LoginComponent },
 { path: 'dashboardAdmin', component: DashboardAdminComponent },
 
 //{ path: 'login', component: LoginComponent },
 //{path:'maintenance', component: maintenanceComponent},
 //{path:'consommation', component: consommationComponent},
 //{path:'kilometrage', component: kilometrageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
