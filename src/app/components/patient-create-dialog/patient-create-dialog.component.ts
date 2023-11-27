import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorCreateDialogComponent } from '../doctor-create-dialog/doctor-create-dialog.component';
import { PatientService } from 'src/app/services/patient/patient.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

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
    private patientService: PatientService,
    private dialog: MatDialog
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
      dni: [data?.dni || null, [Validators.required,Validators.maxLength(8)]],
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

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  save() {
    const newPatientData = this.patientForm.value;
  
    if (
      this.isNotEmpty(newPatientData.name) &&
      this.isNotEmpty(newPatientData.lastName) &&
      this.isNotEmpty(newPatientData.email) &&
      this.isValidEmail(newPatientData.email)
    ) {
      // Llama a getPatientByDNI y maneja la respuesta dentro del observable
      this.patientService.getPatientByDNI(newPatientData.dni)
        .subscribe(
          (existingPatient) => {
            // El paciente existe, muestra un mensaje de error
            this.openDialog("Ese DNI ya está registrado, verifique");
          },
          (error) => {
            // Hubo un error en la solicitud, maneja el estado aquí
            console.error('Error al verificar el DNI:', error);
  
            // Puedes acceder al código de estado HTTP del error (si está disponible)
            if (error instanceof HttpErrorResponse) {
              console.error('Código de estado HTTP:', error.status);
            }
  
            // Continúa con el resto del código (guardar el paciente) incluso si hay un error
            this.patientService.createPatient(1, newPatientData);
            this.dialogRef.close(newPatientData);
          }
        );
    }
  }
  

  closeDialog() {
    this.dialogRef.close();
  }
}
