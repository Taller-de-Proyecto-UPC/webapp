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
  hasError: boolean = false;


  constructor(
    private dialogRef: MatDialogRef<DoctorCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || null, Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
      lastName: [data?.lastName || null, Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
      email: [data?.email || null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    });
  }

  onKeyPressName(event: KeyboardEvent): void {
    const inputChar = event.key;
    const pattern = /^[a-zA-Z ]*$/;
    const nameControl = this.patientForm.get('name');
  
    if (nameControl) {
      if (!pattern.test(inputChar)) {
        // Si el caracter no es una letra o espacio, establece el estado del formulario en inválido
        nameControl.setErrors({ 'pattern': true });
        event.preventDefault();
      } else {
        // Si es una letra o espacio, resetea el estado del formulario
        nameControl.setErrors(null);
      }
    }
  }

  onKeyPressLastname(event: KeyboardEvent): void {
    const inputChar = event.key;
    const pattern = /^[a-zA-Z ]*$/;
    const nameControl = this.patientForm.get('lastName');
  
    if (nameControl) {
      if (!pattern.test(inputChar)) {
        // Si el caracter no es una letra o espacio, establece el estado del formulario en inválido
        nameControl.setErrors({ 'pattern': true });
        event.preventDefault();
      } else {
        // Si es una letra o espacio, resetea el estado del formulario
        nameControl.setErrors(null);
      }
    }
  }
  
  onInputName(): void {
    const nameControl = this.patientForm.get('name');
    if (nameControl) {
      nameControl.setErrors(null);
    }  
  }

  onInputLastname(): void {
    const nameControl = this.patientForm.get('name');
    if (nameControl) {
      nameControl.setErrors(null);
    }  
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
