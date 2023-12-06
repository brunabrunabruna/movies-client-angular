// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
  isFavorite(favMovieId: string): boolean {
    return this.fetchApiData.isFavMovies(favMovieId);
  }

  addFavMovie(favMovieId: string): void {
    this.fetchApiData.addFavMovie(favMovieId).subscribe(() => {
      console.log('addfavmovies called');

      this.snackBar.open('added to favorites', 'OK', { duration: 2000 });
      console.log('addfavmovies called');
    });
  }

  removeFavMovie(favMovieId: string): void {
    this.fetchApiData.deleteFavMovie(favMovieId).subscribe(() => {
      this.snackBar.open('removed movie from favorites', 'OK', {
        duration: 2000,
      });
    });
    console.log('removed fav movie');
  }
}
