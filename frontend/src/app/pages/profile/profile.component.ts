import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FriendService } from '../../services/friend.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule]
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

  constructor(
    private postService: PostService,
    private friendService: FriendService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private AuthService : AuthService,
  ) { }

  ngOnInit() {
    this.getUserPosts();
    this.getFriendsPosts();
    this.loadFriendRequests();
  }

  logout () :void {
    this.AuthService.logout();
  }

  createPost(): void {
    const postData = {
      text: this.newPostContent,
      userId: localStorage.getItem('userId')
    };
    this.postService.createPost(postData).subscribe((response) => {
      if (response.success) {       
        this.posts.unshift(response.post);
        this.posts = [...this.posts];
        this.cdr.detectChanges(); 
  
        console.log('Posts array after adding a post:', this.posts);
  
        this.newPostContent = '';
      } else {
        console.error('Error creating post');
      }
    });
  }
  
  likePost(postId: string): void {
    this.postService.likePost(postId).subscribe((response) => {
      if (response.success) {
        const postIndex = this.posts.findIndex(post => post._id === postId);
        if (postIndex > -1) {
          this.posts[postIndex].likes = response.post.likes; 
          this.posts = [...this.posts]; 
          this.cdr.detectChanges(); 
        }
      } else {
        console.error('Error liking post');
      }
    });
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
    const commentData = { text: this.commentTexts[postId],userId, postId }; 
    this.postService.commentOnPost(postId, commentData).subscribe((response) => {
      if (response.success) {
        const post = this.posts.find(p => p._id === postId);
        if (post) {
          post.comments.unshift(response.comment); 
        }
        this.commentTexts[postId] = ''; 
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

        this.searchResults = [...this.searchResults, foundUser];
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
  

  private updateSearchResults(userId: string, changes: Partial<any>) {
    this.searchResults = this.searchResults.map(user =>
      user._id === userId ? { ...user, ...changes } : user
    );
  }
}
