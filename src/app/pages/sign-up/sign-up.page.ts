import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  ngOnInit(){

  }
  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First Name is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'lastname': [
      { },
      {  }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'phonenumber': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'pattern', message: 'Enter a valid number.'
     },
     { type: 'minlength', message: 'Number must be at least 10 characters long.'}
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
    private authService: FirebaseAuthService
  ) {
    this.signUpForm = new FormGroup({
      'firstname': new FormControl('', Validators.compose([
        Validators.required,
        
      ])),
      'lastname': new FormControl('', Validators.compose([
       
      ])),
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'phonenumber': new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]{10}')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
   
  }

  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // redirect the user to the profile page
 

  signUpWithEmail() {
    this.authService.signUpWithEmail(this.signUpForm.value['firstname'],this.signUpForm.value['lastname'],this.signUpForm.value['email'],this.signUpForm.value['phonenumber'], this.signUpForm.value['password'])
    .subscribe(result => {
      // navigate to user profile
      Swal.fire(
        'Done!',
        'Account Created Successfully',
        'success'
      ).then( () =>{

        this.router.navigate(['/login']);
      }
        
      )
      
      
    },
    error => {
      console.log('error');
    }
    )
   
  }




 
}
