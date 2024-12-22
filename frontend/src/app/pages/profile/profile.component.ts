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
  friends: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  friendRequests: any[] = [];
  friendRequestsList : any[] = [];
  constructor(private postService: PostService, private friendService: FriendService, private userService: UserService) {}

  ngOnInit() {
    this.getUserPosts();
    this.getFriendsPosts();
    this.loadFriendRequests();
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
        const foundUser = response.searchResult;
        this.friendRequestsList = response.searchResult.friendRequests
        console.log('wH.',response.searchResult.friendRequests)
        console.log('=>',this.friendRequestsList)
        const isFriend = this.friends.some(friend => friend._id === foundUser._id);
        const hasPendingRequest = this.friendRequestsList.some(request => request.sender._id === foundUser._id && request.status === "pending");
        console.log('haspending',hasPendingRequest)
        foundUser.friendStatus = isFriend
          ? "Friend"
          : (hasPendingRequest ? "Pending" : "Send Friend Request");
          console.log('=>',foundUser)
        this.searchResults.push(foundUser);
        console.log('=>',this.searchResults)

      });
    }
  }
  
  sendFriendRequest(user: any): void {
    const senderId = localStorage.getItem('userId');
    if (!senderId) {
      console.error('User ID not found in localStorage');
      return;
    }
    this.userService.sendFriendRequest(user, String(senderId)).subscribe(response => {
      if (response.success) {
        const userInSearchResults = this.searchResults.find(u => u._id === user._id);
        if (userInSearchResults) {
          userInSearchResults.friendStatus = 'Pending';
        }
      } else {
        console.error('Error sending friend request');
      }
    }, error => {
      console.error('An error occurred while sending the friend request:', error);
    });
  }
  
}
