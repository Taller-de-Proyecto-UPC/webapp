import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userService: UserService) { }

  get isDoctor(): boolean {
    return this.userService.getUserType() === 'doctor';
  }

  get isAdmin(): boolean {
    return this.userService.getUserType() === 'admin';
  }

  clearUserType(): void {
    this.userService.clearUserType();
  }
}
