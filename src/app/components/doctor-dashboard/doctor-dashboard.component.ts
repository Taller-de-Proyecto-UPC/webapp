import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PatientEditDialogComponent } from '../patient-edit-dialog/patient-edit-dialog.component';
import { Router } from '@angular/router';
import { PatientCreateDialogComponent } from '../patient-create-dialog/patient-create-dialog.component';
import { Patient } from 'src/app/interfaces/patient';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
  patientData: Patient[] = [];
  searchTerm: string = '';
  hasError: boolean = false;

  constructor(private http: HttpClient, private router: Router,private patientService: PatientService, private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.obtenerListaDePacientes();
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const pattern = /^[a-zA-Z ]*$/;

    if (!pattern.test(inputValue)) {
      // Si el valor no coincide con la expresión regular, establece el valor sin el último carácter
      this.searchTerm = inputValue.slice(0, -1);
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    const inputChar = event.key;
    const pattern = /^[a-zA-Z ]*$/;

    if (!pattern.test(inputChar)) {
      // Si el caracter no es una letra o espacio, muestra el error
      this.hasError = true;
      event.preventDefault();
    } else {
      // Si es una letra o espacio, resetea el error
      this.hasError = false;
    }
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
    this.patientService.saveName(patient.name,patient.lastName);
    // Redirige a la página "patient-detail" con el ID del paciente en la URL
    this.router.navigate(['/patient-detail', patientId]);
  }


  sanitizePassword(password: string): string {
    return '*'.repeat(password.length);
  }

  
  confirmDeletePatient(patient: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres borrar este paciente?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario hizo clic en "Sí", borra el doctor
        this.patientService.deletePatient(patient.id)
      }
    });
  }


  deleteDoctor(patient: any): void {
    // Agrega la lógica para eliminar el doctor
    this.patientService.deletePatient(patient.id)
  }
}
