import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorEditDialogComponent } from './components/doctor-edit-dialog/doctor-edit-dialog.component';
import { PatientEditDialogComponent } from './components/patient-edit-dialog/patient-edit-dialog.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { DoctorCreateDialogComponent } from './components/doctor-create-dialog/doctor-create-dialog.component';
import { PatientCreateDialogComponent } from './components/patient-create-dialog/patient-create-dialog.component';
import { ReportCreateComponent } from './components/report-create/report-create.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportEditDialogComponent } from './components/report-edit-dialog/report-edit-dialog.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FormsModule } from '@angular/forms';
import { UserCreateDialogComponent } from './components/user-create-dialog/user-create-dialog.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { environment } from 'src/environment/environment';
import { provideStorage, getStorage } from '@angular/fire/storage'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Cambia el formato de entrada del campo de fecha
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Cambia el formato de visualización del campo de fecha
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    DoctorDashboardComponent,
    LoginComponent,
    DoctorEditDialogComponent,
    PatientEditDialogComponent,
    PatientDetailComponent,
    DoctorCreateDialogComponent,
    PatientCreateDialogComponent,
    ReportCreateComponent,
    NavbarComponent,
    ReportEditDialogComponent,
    MessageDialogComponent,
    ConfirmationDialogComponent,
    UserDashboardComponent,
    UserCreateDialogComponent,
    UserEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    provideStorage(() => getStorage())
    
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
