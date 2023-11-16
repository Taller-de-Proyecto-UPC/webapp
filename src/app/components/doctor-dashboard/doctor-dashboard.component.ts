import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PatientEditDialogComponent } from '../patient-edit-dialog/patient-edit-dialog.component';
import { Router } from '@angular/router';
import { PatientCreateDialogComponent } from '../patient-create-dialog/patient-create-dialog.component';
import { Patient } from 'src/app/interfaces/patient';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
  patientData: Patient[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router,private patientService: PatientService, private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.obtenerListaDePacientes();
  }

  obtenerListaDePacientes() {
    this.patientService.getAllPatients().subscribe((data: any) => {
      this.patientData = data;
    });
  }

  filteredPatients(): any[] {
    return this.patientData.filter(patient =>
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openEditDialog(patient: any): void {
    const dialogRef = this.dialog.open(PatientEditDialogComponent, {
      width: '400px',
      data: patient, // Pasa el doctor seleccionado al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  openCreateDialog(): void {
    const newPatient = { id: null, name: '', lastName: '', email: ''};
    const dialogRef = this.dialog.open(PatientCreateDialogComponent, {
      width: '400px',
      data: newPatient, // Pasa el objeto del nuevo doctor al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Manejar los datos del nuevo doctor si es necesario
    });
  }

  openDetailDialog(patient: any) {
    // Supongamos que patient tiene una propiedad "id" que deseas pasar a la página de detalle
    const patientId = patient.id;

    // Redirige a la página "patient-detail" con el ID del paciente en la URL
    this.router.navigate(['/patient-detail', patientId]);
  }


  sanitizePassword(password: string): string {
    return '*'.repeat(password.length);
  }


  deleteDoctor(patient: any): void {
    // Agrega la lógica para eliminar el doctor
    this.patientService.deletePatient(patient.id)
  }
}
