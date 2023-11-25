import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { DoctorCreateDialogComponent } from '../doctor-create-dialog/doctor-create-dialog.component';
import { Doctor } from 'src/app/interfaces/doctor';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  doctorData: Doctor[] = [];
  searchTerm: string = '';
  hasError: boolean = false;

  constructor(private http: HttpClient,     private doctorService: DoctorService, private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.obtenerListaDeDoctores();
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

  obtenerListaDeDoctores() {
    this.doctorService.getAllDoctors().subscribe((data: any) => {
      this.doctorData = data;
    });
  }

  filteredDoctors(): any[] {
    return this.doctorData.filter((doctor: { name: string; }) =>
      doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openEditDialog(doctor: any): void {
    const dialogRef = this.dialog.open(DoctorEditDialogComponent, {
      width: '400px',
      data: doctor, // Pasa el doctor seleccionado al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    
  }

  openCreateDialog(): void {
    const newDoctor = { id: null, name: '', lastName: '', email: '', password: '' };
    const dialogRef = this.dialog.open(DoctorCreateDialogComponent, {
      width: '400px',
      data: newDoctor, // Pasa el objeto del nuevo doctor al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Manejar los datos del nuevo doctor si es necesario
    });
  }
  
  
  sanitizePassword(password: string): string {
    return '*'.repeat(password.length);
  }

  confirmDeleteDoctor(doctor: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres borrar este doctor?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario hizo clic en "Sí", borra el doctor
        this.doctorService.deleteDoctor(doctor.id)
      }
    });
  }


  deleteDoctor(doctor: any): void {
    // Agrega la lógica para eliminar el doctor
    this.doctorService.deleteDoctor(doctor.id)
  }
}
