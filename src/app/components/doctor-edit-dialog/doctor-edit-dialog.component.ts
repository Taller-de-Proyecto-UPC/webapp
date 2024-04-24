import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { Doctor } from 'src/app/interfaces/doctor';

@Component({
  selector: 'app-doctor-edit-dialog',
  templateUrl: './doctor-edit-dialog.component.html',
  styleUrls: ['./doctor-edit-dialog.component.css']
})
export class DoctorEditDialogComponent {
  doctorForm: FormGroup;
  hasError: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<DoctorEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {
    console.log(data.doctorId)
    

    this.doctorForm = this.fb.group({
      id: [data?.doctorId || null],
      name: [data?.name || null, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastName: [data?.lastName || null, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: [data?.email || null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      phone: [data?.phone || null, Validators.maxLength(15)], // Ajusta según tus necesidades
      address: [data?.address || null, Validators.required],
      birthday: [data?.birthday || null, Validators.required],
      specialty: [data?.specialty || null, Validators.required],
      password: [data?.user?.password || null, Validators.required],
      username: [data?.user?.username || null, Validators.required], 
      role:[data?.user?.role || null],     
      cip: [data?.cip || null]
    });    
  }

  
  onKeyPressName(event: KeyboardEvent): void {
    const inputChar = event.key;
    const pattern = /^[a-zA-Z ]*$/;
    const nameControl = this.doctorForm.get('name');
  
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
    const nameControl = this.doctorForm.get('lastName');
  
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
    const nameControl = this.doctorForm.get('name');
  
    if (nameControl) {
      const inputValue = nameControl.value as string;
  
      if (!/^[a-zA-Z ]*$/.test(inputValue)) {
        // No necesitas establecer manualmente los errores, Angular lo hará automáticamente
      }
    }
  }
  

  onInputLastname(): void {
    const nameControl = this.doctorForm.get('name');
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
    // Verifica si los campos no están vacíos antes de guardar
    if (
      this.isNotEmpty(this.doctorForm.value.name) &&
      this.isNotEmpty(this.doctorForm.value.lastName) &&
      this.isNotEmpty(this.doctorForm.value.email) &&
      this.isNotEmpty(this.doctorForm.value.password) &&
      this.isValidEmail(this.doctorForm.value.email)
    ) {
      // Crea un objeto con la estructura original del Doctor
      const updatedDoctorData: Doctor = {
        doctorId: this.doctorForm.value.id,
        name: this.doctorForm.value.name,
        lastName: this.doctorForm.value.lastName,
        email: this.doctorForm.value.email,
        phone: this.doctorForm.value.phone,
        address: this.doctorForm.value.address,
        birthday: this.doctorForm.value.birthday,
        specialty: this.doctorForm.value.specialty,
        user: {
          username: this.doctorForm.value.username,
          password: this.doctorForm.value.password,
          role: this.doctorForm.value.role, // Ajusta según tus necesidades
          active: true
        },
        cip: this.doctorForm.value.cip,
      };
  
      // Imprime los datos actualizados (opcional)
      console.log(updatedDoctorData);
  
      // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
      this.doctorService.updateDoctor(updatedDoctorData.doctorId, updatedDoctorData);
      this.dialogRef.close(updatedDoctorData);
    } else {
      // Muestra un mensaje de error si algún campo está vacío
      // alert('Por favor, completa todos los campos.');
    }
  }
  

  closeDialog() {
    this.dialogRef.close();
  }

  
}
