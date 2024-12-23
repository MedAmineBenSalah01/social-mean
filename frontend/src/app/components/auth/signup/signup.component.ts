import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports:[FormsModule]
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.signup(userData).subscribe(
      (response) => {
        this.router.navigate(['/login']);  
      },
      (error) => {
        console.error('Signup Failed', error);
      }
    );
  }
}
