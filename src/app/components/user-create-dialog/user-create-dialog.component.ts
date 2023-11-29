import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/interfaces/doctor';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { DoctorCreateDialogComponent } from '../doctor-create-dialog/doctor-create-dialog.component';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.css']
})
export class UserCreateDialogComponent {
  userForm: FormGroup;
  hasError: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      id: [data?.id || null],
      username: [data?.username || null, [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      password: [data?.password || null],
      role: ['admin'],
      active: true
    });
    
  }


  onInputUsername(): void {
    const nameControl = this.userForm.get('username');
    if (nameControl) {
      nameControl.setErrors(null);
    }  
  }

  onKeyPressUsername(event: KeyboardEvent): void {
    const inputChar = event.key;
    const pattern = /^[a-zA-Z ]*$/;
    const nameControl = this.userForm.get('username');
  
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


  

  isNotEmpty(value: string | null): boolean {
    // Verifica si el valor es null o undefined antes de intentar realizar la operación trim
    return value !== null && value !== undefined && value.trim() !== '';
  }



  save() {
    console.log("entro al save")
    console.log(this.userForm.value.username)
    console.log(this.userForm.value.password)
    if (
      this.isNotEmpty(this.userForm.value.username) &&
      this.isNotEmpty(this.userForm.value.password)) {
      console.log("entro al if")
      const newUserData: User = {
        id: this.userForm.value.id,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
        active: true
      };
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.userService.createUser(newUserData);
    this.dialogRef.close(newUserData);
    } else{
      
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
