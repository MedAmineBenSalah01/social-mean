import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FriendService } from '../../services/friend.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ProfileComponent implements OnInit {
  newPostContent: string = '';
  commentText: string = '';
  posts: any[] = [];
  friendsPosts: any[] = [];
  friends: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  friendRequests: any[] = [];
  friendRequestsList: any[] = [];
  commentTexts: { [key: string]: string } = {};
  username: string = '';
  isDisabled: Boolean =  false;

  constructor(
    private postService: PostService,
    private friendService: FriendService,
    private userService: UserService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUserPosts();
    this.getFriendsPosts();
    this.loadFriendRequests();
    this.username = String(localStorage.getItem('username'));
  }

  logout(): void {
    this.authService.logout();
  }

  verify() {
    const userId = this.authService.getUserId();
    const likedAlready = this.posts.some(post => post.likes.includes(userId))
    if(likedAlready) {
      this.isDisabled = true;
    }
    else {
      this.isDisabled = false;
    }
    console.log('zada',this.isDisabled)
    return this.isDisabled;
  }

  createPost(): void {
    if (!this.newPostContent.trim()) {
      return;
    }

    const postData = {
      text: this.newPostContent,
      userId: localStorage.getItem('userId')
    };

    this.postService.createPost(postData).subscribe((response) => {
      if (response.message  = "Post created successfully") {
        this.posts = [response.post, ...this.posts];
        this.newPostContent = '';
        this.getUserPosts();
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
        this.getFriendsPosts();
        this.getUserPosts();
      } else {
        console.error('Error liking post');
      }
    });
  }

  updatePostLikes(postId: string) {
    const post = this.posts.find((p) => p._id === postId);
    if (post) {
      post.likes.push(this.authService.getUserId());
    }
  }

  loadFriendRequests(): void {
    const userId = localStorage.getItem('userId');
    this.userService.getFriendRequests(String(userId)).subscribe(
      (response) => {
        if (response.success) {
          this.friendRequests = response.friendRequests;
        } else {
          console.error('Error fetching friend requests');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
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
        this.getFriendsPosts();
        this.getUserPosts();
      }
    });
  }

  respondToFriendRequest(requestId: string, status: string): void {
    this.userService.respondToFriendRequest(requestId, status).subscribe(
      (response) => {
        if (response.success) {
          this.loadFriendRequests();
        } else {
          console.error('Error responding to friend request');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  getUserPosts() {
    this.postService.getUserPosts().subscribe((response) => {
      this.posts = response.posts;
      console.log('=>',response.posts)
    });
  }

  getFriendsPosts() {
    this.friendService.getFriendsPosts().subscribe((response) => {
      this.friendsPosts = response.posts;
    });
  }

  searchFriends(): void {
    if (this.searchQuery) {
      this.userService.searchUsers(this.searchQuery).subscribe((response) => {
        const foundUser = response.searchResult;
        this.friendRequestsList = response.searchResult.friendRequests;

        const isFriend = this.friends.some(friend => friend._id === foundUser._id);
        const hasPendingRequest = this.friendRequestsList.some(request =>
          request.sender === localStorage.getItem('userId') && request.status === 'pending'
        );

        foundUser.friendStatus = isFriend
          ? 'Friend'
          : hasPendingRequest
            ? 'Pending'
            : 'Send Friend Request';

        this.searchResults = [foundUser, ...this.searchResults];
      });
    }
  }

  sendFriendRequest(user: any): void {
    const senderId = localStorage.getItem('userId');
    if (!senderId) {
      console.error('User ID not found in localStorage');
      return;
    }
    this.userService.sendFriendRequest(user, String(senderId)).subscribe(
      (response) => {
        if (response.success) {
          this.searchResults = this.searchResults.map((u) => {
            return u._id === user ? { ...u, friendStatus: 'Pending' } : u;
          });
        } else {
          console.error('Error sending friend request');
        }
      },
      (error) => {
        console.error('An error occurred while sending the friend request:', error);
      }
    );
  }
}
