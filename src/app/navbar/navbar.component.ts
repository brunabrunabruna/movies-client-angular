import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('user logged out');
    //test logging users info
    this.snackBar.open('user logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }
}
