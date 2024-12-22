import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient,private router: Router) {}

  signup(userData: any): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  logout(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
