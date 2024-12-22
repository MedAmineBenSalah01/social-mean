import { Component, Input } from '@angular/core';
import { FriendService } from '../../../services/friend.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent {
  @Input() friendId: string = '';

  constructor(private friendService: FriendService) {}

  sendRequest() {
    this.friendService.sendFriendRequest(this.friendId).subscribe(
      (response) => {
        console.log('Friend Request Sent', response);
      },
      (error) => {
        console.error('Error sending friend request', error);
      }
    );
  }
}
