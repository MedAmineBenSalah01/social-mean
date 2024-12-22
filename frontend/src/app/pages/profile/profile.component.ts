import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FriendService } from '../../services/friend.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[CommonModule,FormsModule]
})
export class ProfileComponent implements OnInit {
  posts: any[] = [];
  friendsPosts: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private postService: PostService, private friendService: FriendService, private userService: UserService) {}

  ngOnInit() {
    this.getUserPosts();
    this.getFriendsPosts();
  }

  getUserPosts() {
    this.postService.getUserPosts().subscribe((response) => {
       this.posts = response.posts;
      console.log('this post',response.posts)
    });
  }

  getFriendsPosts() {
    this.friendService.getFriendsPosts().subscribe((response) => {
       this.friendsPosts = response.posts;
      console.log('this.friendsPosts',response.posts)

    });
  }
  searchFriends(): void {
    if (this.searchQuery) {
      this.userService.searchUsers(this.searchQuery).subscribe(response => {
        if (response.searchResult) {
          this.searchResults = Array.isArray(response.searchResult)
            ? response.searchResult
            : [response.searchResult];
        } else {
          this.searchResults = []; 
        }
      });
    }
  }
  sendFriendRequest(friendId: string): void {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      this.userService.sendFriendRequest(userId, friendId).subscribe(response => {
        console.log('Friend request sent', response);
      });
    }
  }
}
