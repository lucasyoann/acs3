import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
 
  constructor(private userService: UserService) { }
 
  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
        console.log("userService OK");
      },
      error => {
        console.log("userService KO");
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(this.errorMessage);
      }
    );
  }
}