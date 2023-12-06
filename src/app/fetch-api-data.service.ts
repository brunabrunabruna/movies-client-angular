import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-api-render-0a0q.onrender.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //
  public userLogin(username: string, password: string): Observable<any> {
    return this.http
      .post(apiUrl + 'login', { username, password })
      .pipe(catchError(this.handleError));
  }

  //
  // public getAllMovies(): Observable<any> {
  //   console.log('getallmovies called');
  //   const token = localStorage.getItem('token');
  //   console.log(token);
  //   return this.http
  //     .get<Response>(apiUrl + 'movies', {
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + token,
  //       }),
  //     })
  //     .pipe(map(this.extractResponseData), catchError(this.handleError));
  // }
  public getAllMovies(): Observable<any> {
    console.log('getallmovies called');
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token value
    return this.http
      .get<Response>(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public getOneMovies(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + 'movies/' + movie, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + director, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + genre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public getFavMovies(username: string): Observable<any> {
    return this.getUser(username).pipe(
      map((user) => user.favoriteMovies),
      catchError(this.handleError)
    );

    // const token = localStorage.getItem('token');
    // return this.http
    //   .get<Response>(apiUrl + 'users/' + username + movieID, {
    //     headers: new HttpHeaders({
    //       Authorization: 'Bearer ' + token,
    //     }),
    //   })
    //   .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public addFavMovie(username: string, favMovieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post<Response>(apiUrl + 'users/' + username + '/movies/' + favMovieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // //
  // public editUser(updatedUser: any): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   // const user = localStorage.getItem('user');
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   console.log('editUser called');
  //   console.log('user:', user);
  //   return this.http
  //     .put<Response>(apiUrl + 'users/' + user.username, updatedUser, {
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + token,
  //       }),
  //     })
  //     .pipe(map(this.extractResponseData), catchError(this.handleError));
  // }

  //test
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const token = localStorage.getItem('token');
    return this.http
      .put<Response>(apiUrl + 'users/' + user.username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<Response>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //
  public deleteFavMovie(username: string, favMovieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<Response>(
        apiUrl + 'users/' + username + '/movies/' + favMovieId,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  //
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
