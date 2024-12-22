import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);  
        localStorage.setItem('userId', response.user.id);  
        localStorage.setItem('username', response.user.name);  
        this.router.navigate(['/profile']);  
      },
      (error) => {
        console.error('Login Failed', error);
      }
    );
  }
}
