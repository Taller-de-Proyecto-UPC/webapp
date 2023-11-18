import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-edit-dialog',
  templateUrl: './doctor-edit-dialog.component.html',
  styleUrls: ['./doctor-edit-dialog.component.css']
})
export class DoctorEditDialogComponent {
  doctorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DoctorEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {
    this.doctorForm = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || null, Validators.required],
      lastName: [data?.lastName || null, Validators.required],
      email: [data?.email || null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: [data?.password || null, Validators.required]
    });
  }

  isNotEmpty(value: string | null): boolean {
    // Verifica si el valor es null o undefined antes de intentar realizar la operación trim
    return value !== null && value !== undefined && value.trim() !== '';
  }

  isValidEmail(email: string): boolean {
    // Utilizamos una expresión regular simple para verificar la validez del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  save() {
    // Verifica si los campos no están vacíos antes de guardar
    if (
      this.isNotEmpty(this.doctorForm.value.name) &&
      this.isNotEmpty(this.doctorForm.value.lastName) &&
      this.isNotEmpty(this.doctorForm.value.email) &&
      this.isNotEmpty(this.doctorForm.value.password) &&
      this.isValidEmail(this.doctorForm.value.email)
    ) {
      const updatedDoctorData = this.doctorForm.value;
      // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
      this.doctorService.updateDoctor(updatedDoctorData.id, updatedDoctorData);
      this.dialogRef.close(updatedDoctorData);
    } else {
      // Muestra un mensaje de error si algún campo está vacío
      //alert('Por favor, completa todos los campos.');
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  
}
