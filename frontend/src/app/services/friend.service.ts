import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private apiUrl = 'http://localhost:5000/api/v1/';  

  constructor(private http: HttpClient) {}

  sendFriendRequest(friendId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}send-request`, { friendId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getFriendsPosts(): Observable<any> {
    const userId = localStorage.getItem('userId'); 
    return this.http.post(`${this.apiUrl}friends/posts`, { userId },  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
