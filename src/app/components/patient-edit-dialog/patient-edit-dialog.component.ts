import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorEditDialogComponent } from '../doctor-edit-dialog/doctor-edit-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-edit-dialog',
  templateUrl: './patient-edit-dialog.component.html',
  styleUrls: ['./patient-edit-dialog.component.css']
})
export class PatientEditDialogComponent {
  patientForm: FormGroup;
  hasError: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PatientEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || null, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: [data?.lastName || null, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: [data?.email || null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      // Agrega los nuevos campos según sea necesario
      phone: [data?.phone || null, [Validators.required, Validators.maxLength(15)] ], // Ajusta según tus necesidades
      address: [data?.address || null, Validators.required],
      birthday: [data?.birthday || null, Validators.required],
      bloodType: [data?.bloodType || null],
      diseases: [data?.diseases || null],
      height: [data?.height || null],
      weight: [data?.weight || null],
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
      const inputValue = nameControl.value as string;
  
      if (!/^[a-zA-Z ]*$/.test(inputValue)) {
        // No necesitas establecer manualmente los errores, Angular lo hará automáticamente
      }
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
    if (
      this.isNotEmpty(this.patientForm.value.name) &&
      this.isNotEmpty(this.patientForm.value.lastName) &&
      this.isNotEmpty(this.patientForm.value.email) &&
      this.isValidEmail(this.patientForm.value.email)
    ) {
    const updatedPatientData = this.patientForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.patientService.updatePatient(updatedPatientData.id,updatedPatientData);
    this.dialogRef.close(updatedPatientData);}
    else{
      
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
