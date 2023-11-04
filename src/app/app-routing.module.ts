import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
