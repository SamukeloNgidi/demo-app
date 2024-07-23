import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import {Users} from './user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'demo-app';
  public users: Users[]; //variable to hold all users and return them when called in an html file
  public editUser: Users | null; //bind eemployee to the edit form
  public deleteUser: Users | null;

  constructor(private userService: UserService){} //inject the service to this app component
    
  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void{
    this.userService.getUsers().subscribe( //call the service
      (response: Users[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddUser(addForm: NgForm): void{
    document.getElementById('add-user-form')?.click(); //hide pop up to add user after 'add-user-form' (save changes) button is clicked
    this.userService.addUser(addForm.value).subscribe( //subscribe to be notified if something comes back from the server
      (response: Users) => {
        console.log(response); //log to see what the response is
        this.getUsers(); //get all users
        addForm.reset(); //clear the form after adding a user (avoid previous details coming up when adding another user)
      },
        (error: HttpErrorResponse) =>{ //if there's an error, show an alert (error handling)
          alert(error.message);
          addForm.reset();
        }
      );
  };

  public onUpdateUser(user: Users): void{
    this.userService.updateUser(user).subscribe( //subscribe to be notified if something comes back from the server
      (response: Users) => {
        console.log(response); //log to see what the response is
        this.getUsers(); //get all users
      },
        (error: HttpErrorResponse) =>{ //if there's an error, show an alert (error handling)
          alert(error.message);
        }
      );
  };

  public onDeleteUser(userId: Number): void{
    this.userService.deleteUser(userId).subscribe( //subscribe to be notified if something comes back from the server
      (response: void) => {
        console.log(response); //log to see what the response is
        this.getUsers(); //get all users
      },
        (error: HttpErrorResponse) =>{ //if there's an error, show an alert (error handling)
          alert(error.message);
        }
      );
  };

  public onOpenModal(user: Users | null, mode: string) : void {//mode tells what the user is trying to do e.g. Edit user (opens pop up modal)

    const container = document.getElementById('main-container'); //access the entire div
    const button = document.createElement('button'); //create the button
    button.type = 'button'; //change button default type from submit to button
    button.style.display = 'none'; //hide the button since the card already has it
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addUserModal');
    }
    if(mode === 'edit'){
      this.editUser = user; //all retrieved users when button clicked will be passed to editUser
      button.setAttribute('data-target','#updateUserModal');
    }
    if(mode === 'delete'){
      this.deleteUser = user;
      button.setAttribute('data-target','#deleteUserModal');
    }
    container?.appendChild(button); //create the button
    button.click(); //make it clickable
  }

}
