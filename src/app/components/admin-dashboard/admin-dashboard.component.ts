import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { DoctorCreateDialogComponent } from '../doctor-create-dialog/doctor-create-dialog.component';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  doctorData: any;

  constructor(private http: HttpClient,     private doctorService: DoctorService, private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.obtenerListaDeDoctores();
  }

  obtenerListaDeDoctores() {
    this.doctorService.getAllDoctors().subscribe((data: any) => {
      this.doctorData = data;
    });
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


  deleteDoctor(doctor: any): void {
    // Agrega la lógica para eliminar el doctor
    this.doctorService.deleteDoctor(doctor.id)
  }
}
