// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData
      .userLogin(this.userData.username, this.userData.password)
      .subscribe(
        (result) => {
          // console.log('result:', result);
          //TEST, STILL NEEDS CONFIRMATION THAT OT WORKS
          localStorage.setItem('user', JSON.stringify(result.user.username));

          localStorage.setItem('token', JSON.stringify(result.token));
          // console.log(result.user.username);
          // console.log(result.token);
          // Logic for a successful user registration goes here! (To be implemented)
          this.dialogRef.close(); // This will close the modal on success!
          //test logging users info
          this.snackBar.open(result, 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000,
          });
        }
      );
  }
}
