import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private loginService: LoginService) { }

  get isDoctor(): boolean {
    return this.loginService.getUserType() === 'doctor';
  }

  get isAdmin(): boolean {
    return this.loginService.getUserType() === 'admin';
  }

  clearUserType(): void {
    this.loginService.clearUserType();
  }
}
