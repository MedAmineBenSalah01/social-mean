import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
  imports : [FormsModule,CommonModule]
})
export class UserPostsComponent implements OnInit {
  posts: any[] = [];
  commentTexts: { [key: string]: string } = {};
  isDisabled: Boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUserPosts();
  }

  verify() {
    const userId = this.authService.getUserId();
    const likedAlready = this.posts.some(post => post.likes.includes(userId));
    this.isDisabled = likedAlready;
    return this.isDisabled;
  }

  createPost(newPostContent: string): void {
    if (!newPostContent.trim()) {
      return;
    }

    const postData = {
      text: newPostContent,
      userId: localStorage.getItem('userId')
    };

    this.postService.createPost(postData).subscribe((response) => {
      if (response.message === "Post created successfully") {
        this.posts = [response.post, ...this.posts];
      } else {
        console.error('Error creating post');
      }
    });
  }

  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe((response) => {
      if (response.message === "Post liked successfully") {
        this.posts = this.posts.map((post) => {
          return post._id === postId ? { ...post, likes: response.post.likes } : post;
        });
      } else {
        console.error('Error liking post');
      }
    });
  }

  commentOnPost(postId: string): void {
    const userId = localStorage.getItem('userId');
    const commentData = { text: this.commentTexts[postId], userId, postId };

    this.postService.commentOnPost(postId, commentData).subscribe((response) => {
      if (response.message === "Comment added successfully") {
        const post = this.posts.find(p => p._id === postId);
        if (post) {
          post.comments.unshift(response.comment);
        }
        this.commentTexts[postId] = '';
      }
    });
  }

  getUserPosts() {
    this.postService.getUserPosts().subscribe((response) => {
      this.posts = response.posts;
    });
  }
}
