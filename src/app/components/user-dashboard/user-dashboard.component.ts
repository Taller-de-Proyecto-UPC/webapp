import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserCreateDialogComponent } from '../user-create-dialog/user-create-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  userData: User[] = [];
  searchTerm: string = '';
  hasError: boolean = false;

  constructor(private http: HttpClient,     private userService: UserService, private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.obtenerListaDeDoctores();
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const pattern = /^[a-zA-Z ]*$/;

    if (!pattern.test(inputValue)) {
      // Si el valor no coincide con la expresión regular, establece el valor sin el último carácter
      this.searchTerm = inputValue.slice(0, -1);
    }
  }

  filteredUsers(): any[] {
    return this.userData.filter((user: { username: string; }) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onKeyPress(event: KeyboardEvent): void {
    const inputChar = event.key;
    const pattern = /^[a-zA-Z ]*$/;

    if (!pattern.test(inputChar)) {
      // Si el caracter no es una letra o espacio, muestra el error
      this.hasError = true;
      event.preventDefault();
    } else {
      // Si es una letra o espacio, resetea el error
      this.hasError = false;
    }
  }

  obtenerListaDeDoctores() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.userData = data;
    });
  }

  sanitizePassword(password: string): string {
    return '*'.repeat(password.length);
  }

  openEditDialog(user: any): void {
    //console.log(doctor.user.username);
    //console.log(doctor.user.password);
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: user, // Pasa el doctor seleccionado al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
    });    
  }

  openCreateDialog(): void {
    const newUser = { id: null, username: '', password: '', role: ''};
    const dialogRef = this.dialog.open(UserCreateDialogComponent, {
      width: '400px',
      data: newUser, // Pasa el objeto del nuevo doctor al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Manejar los datos del nuevo doctor si es necesario
    });
  }

  confirmDeactivateUser(user: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres dar de baja?' }
    });

    const updateUserData: User = {
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
      active: false
    };

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario hizo clic en "Sí", borra el doctor
        this.userService.updateUser(updateUserData.id,updateUserData)
      }
    });
  }


  deactivateUser(user: any): void {
    // Agrega la lógica para eliminar el doctor
    this.userService.updateUser(user.id,user)
  }
}
