import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { DoctorService } from 'src/app/services/doctor.service';

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
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
  }

  save() {
    const updatedDoctorData = this.doctorForm.value;
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.doctorService.updateDoctor(updatedDoctorData.id,updatedDoctorData);
    this.dialogRef.close(updatedDoctorData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
