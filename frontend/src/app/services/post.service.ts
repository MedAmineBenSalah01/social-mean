import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api/v1/';

  constructor(private http: HttpClient) {}

  createPost(postData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create-post`, postData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getUserPosts(): Observable<any> {
    const userId = localStorage.getItem('userId')
    return this.http.post(`${this.apiUrl}me/posts`, {userId}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  likePost(postId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}${postId}/like`, {
      postId,
      userId:localStorage.getItem('userId')
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  commentOnPost(postId: string, commentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${postId}/comment`, commentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
