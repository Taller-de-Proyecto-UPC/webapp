import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctor-create-dialog',
  templateUrl: './doctor-create-dialog.component.html',
  styleUrls: ['./doctor-create-dialog.component.css']
})
export class DoctorCreateDialogComponent {
  doctorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DoctorCreateDialogComponent>,
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
    if (
      this.isNotEmpty(this.doctorForm.value.name) &&
      this.isNotEmpty(this.doctorForm.value.lastName) &&
      this.isNotEmpty(this.doctorForm.value.email) &&
      this.isNotEmpty(this.doctorForm.value.password) &&
      this.isValidEmail(this.doctorForm.value.email)
    ) {
    const newDoctorData = this.doctorForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.doctorService.createDoctor(1,newDoctorData);
    this.dialogRef.close(newDoctorData);
    } else{
      
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
