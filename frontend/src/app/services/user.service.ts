import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/v1/'; 

  constructor(private http: HttpClient) {}

  searchUsers(username: string): Observable<any> {
    const body = { username: username };
    return this.http.post<any>(`${this.apiUrl}users/search`,  body , {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  sendFriendRequest(userId: string, friendId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${userId}/friend-request`, { id: friendId } ,{
      headers : {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
