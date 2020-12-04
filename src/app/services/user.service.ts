import { Injectable} from '@angular/core';
 import {BehaviorSubject} from 'rxjs';
 import { AngularFireAuth } from '@angular/fire/auth'
 import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 import { throwError } from 'rxjs';
 import { catchError } from 'rxjs/operators';

interface user {
	username: string,
	uid: string
}

 @Injectable()
 export class UsersService{

  // url = 'http://127.0.0.1:8000/currentuser/';
  url = 'https://akstore.herokuapp.com/currentuser/'
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  private user: user

   constructor(private afAuth: AngularFireAuth,
    private http: HttpClient){}
   private myuser = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUser')));
   castUser = this.myuser.asObservable();
   
   editUser(newUser){
     this.myuser.next(newUser); 
   }

   setUser(user: user) {
		this.user = user
	}

	getUsername(): string {
		return this.user.username
  }
  
  getCurrentUser(){
   return this.http.get(this.url, this.options).pipe(
    catchError(this.handleError)
  );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.log("here");
      alert(error.error.non_field_errors);

    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
   getUID(): string {
		return this.user.uid
	}
 }