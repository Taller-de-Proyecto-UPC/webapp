import { Component, Inject } from '@angular/core';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {
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
      password: [data?.password || null, [Validators.required]],
      role: [data?.role || null, [Validators.required]],
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
    if (
      this.isNotEmpty(this.userForm.value.username) &&
      this.isNotEmpty(this.userForm.value.password)) {
      const updateUserData: User = {
        id: this.userForm.value.id,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
        active: true
      };
    // Aquí puedes enviar los datos actualizados al servidor o realizar la edición
    this.userService.updateUser(updateUserData.id, updateUserData);
    this.dialogRef.close(updateUserData);
    } else{
      
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
