import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {  Router } from '@angular/router';
import {UsersService} from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import Swal from 'sweetalert2'
import { User } from '../models/user.model';
import { umask } from 'process';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  profile = true;
  card = false;
  address = false;
  editProfile = false;
  cartItemCount: BehaviorSubject<number>;
  currentUserData= [];

  lastname:string;
  email:string;
  phone:string;
    
  

  segmentChanged(ev: any) {
    console.log(ev);
    if(ev === 'profile'){
      this.profile = true;
      this.card = false;
      this.address = false;

    }
    if(ev === 'card'){
      this.profile = false;
      this.card = true;
      this.address = false;

    }
    if(ev === 'address'){
      this.profile = false;
      this.card = false;
      this.address = true;

    }
  }

uploadimage = false;

 image: File;
  onImageChanged(event){
    this.image = event.target.files[0];

  }

  uploadProfilePicture() {
    
   var user =JSON.parse(localStorage.getItem('user'));
   var id = user.id
    const uploadData = new FormData();
    uploadData.append('image', this.image, this.image.name);
    console.log(uploadData);
    this.authService.uploadUserImage(id,uploadData).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  editUserProfile(){
    this.editProfile = true;
    this.editUserForm = new FormGroup({
      'firstname': new FormControl(this.firstname, Validators.compose([
        Validators.required,
        
      ])),
      'lastname': new FormControl(this.lastname, Validators.compose([
       
      ])),
      'email': new FormControl(this.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'phonenumber': new FormControl(this.phone, Validators.compose([
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

  backToHome(){
     this.router.navigate(['/tabs/tab1/']);

  }

  editUserForm: FormGroup;
  submitError: string;
  

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

  
  constructor(private cartService: CartService,
    private userService: UsersService,
    private authService: FirebaseAuthService,
    
    private router: Router) {

      
this.getCurrentUserData();
      
    }
firstname:string;
ngOnInit(){


  this.cartItemCount = this.cartService.getCartItemCount();
  
}

getCurrentUserData(){
  this.userService.getCurrentUser().subscribe(
    result =>{
     
      localStorage.setItem('user', JSON.stringify(result));
      this.firstname =  result['first_name'];
      this.lastname =  result['last_name'];
      this.email =  result['email'];
      this.phone =  result['phone'];
      
    },
    error =>{
      console.log('error');
    }
  );
      
    }


updateUserProfile() {

  var user =JSON.parse(localStorage.getItem('user'));
  var id = user.id
  
  this.authService.editUserProfile(id,this.editUserForm.value['firstname'],
  this.editUserForm.value['lastname'],this.editUserForm.value['email'],this.editUserForm.value['email'],this.editUserForm.value['phonenumber'],)
  .subscribe(result => {
    // navigate to user profile
    Swal.fire(
      'Done!',
      'Profile Updated',
      'success'
    ).then( () =>{
      this.editProfile = false;
      localStorage.removeItem('user');
      this.getCurrentUserData();


      
    }
      
    )
    
    
  },
  error => {
    console.log('error');
  }
  )
 
}

openCart(){
  this.router.navigate(['/cart']);
}
}
