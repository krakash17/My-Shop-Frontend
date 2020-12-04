import { Component, NgZone,OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;
signIn= false;

validation_messages = {
  'email': [
    { type: 'required', message: 'Email is required.' },
    { type: 'pattern', message: 'Enter a valid email.' }
  ],
  'password': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Password must be at least 6 characters long.' }
  ]
};
  constructor(
    public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private loadingController: LoadingController,
    private authService: FirebaseAuthService
  ) { 
    this.signInForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

   
  }

  signInWithEmail() {

    const username = this.signInForm.value.email;
    const password = this.signInForm.value.password;
    this.authService.authenticate(username, password).subscribe(
      result => {
        // Here we are storing the token and refresh token in the localstorage
        localStorage.setItem('token', result['access']);
        localStorage.setItem('refresh', result['refresh']);
        this.router.navigate(['/tabs/tab1']);
      },

      error => {
        console.log('error');
      }
    );
    // this.authService.signInWithEmail(this.signInForm.value['email'], this.signInForm.value['password'])
    // .then(user => {
    //   // navigate to user profile
    //   this.redirectLoggedUserToProfilePage();
    //   // this.signInForm.value['password'] = null;
    // })
    // .catch(error => {
    //   this.submitError = error.message;
    // });
  }

  ngOnInit() {
  }
  logInAccount(){
    this.signIn = true;
  }
 
}
