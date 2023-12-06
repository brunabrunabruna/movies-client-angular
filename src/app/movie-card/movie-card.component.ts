// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log('this.movies:', this.movies);
      return this.movies;
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      // width: '250px',
      data: {
        title: genre.name,
        content: genre.Description,
      },
    });
  }
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      // width: '250px',
      data: {
        title: director.name,
        content: director.bio,
      },
    });
  }
  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      // width: '250px',
      data: {
        title: 'Synopsis',
        content: movie.description,
      },
    });
  }
}
