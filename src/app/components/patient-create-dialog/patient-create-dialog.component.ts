import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorCreateDialogComponent } from '../doctor-create-dialog/doctor-create-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-create-dialog',
  templateUrl: './patient-create-dialog.component.html',
  styleUrls: ['./patient-create-dialog.component.css']
})
export class PatientCreateDialogComponent {
  patientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DoctorCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || null, Validators.required],
      lastName: [data?.lastName || null, Validators.required],
      email: [data?.email || null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
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
    const newPatientData = this.patientForm.value;
    if (
      this.isNotEmpty(this.patientForm.value.name) &&
      this.isNotEmpty(this.patientForm.value.lastName) &&
      this.isNotEmpty(this.patientForm.value.email) &&
      this.isNotEmpty(this.patientForm.value.password) &&
      this.isValidEmail(this.patientForm.value.email)
    ) {
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.patientService.createPatient(1,newPatientData);
    this.dialogRef.close(newPatientData);}

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
