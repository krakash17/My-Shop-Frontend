import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthService {

 
  constructor(
    private http: HttpClient,
   
  ) {
  }
   
  login_url = 'https://akstore.herokuapp.com/storeapp/login/';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  authenticate(username: string, password: string) {
    const data = { 'username': username, 'password': password };
    return this.http.post(this.login_url, data, this.options)
      .pipe(
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
  signup_url = 'http://127.0.0.1:8000/users/';
  signUpWithEmail(firstname:string,lastname:string,email:string,phonenumber:number,password:string){
    const data = { 'first_name': firstname, 'last_name': lastname, 'email': email,'phone': phonenumber ,'password': password };
    
    return this.http.post(this.signup_url, data, { headers: { Anonymous: 'undefined' }})
  .pipe(
    catchError(this.handleError)
  );
  }

  editUserProfile(id:number,firstname:string,lastname:string,email:string,username:string,phonenumber:number,){
    const data = { 'first_name': firstname, 'last_name': lastname, 'email': email,'username':username,'phone': phonenumber , };
    
    return this.http.patch(this.signup_url + id + '/', data,)
  .pipe(
    catchError(this.handleError)
  );
  }
  uploadUserImage(id:number,uploadData){
    return this.http.patch('http://127.0.0.1:8000/profilepicture/' + id + '/', uploadData).pipe(
      catchError(this.handleError)
    );
  }
}