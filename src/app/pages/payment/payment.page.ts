import { Component, OnInit } from '@angular/core';
import {NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { CartService,Product } from 'src/app/services/cart.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  payment= false;
  openSummary = false;
  changedAddress= true;
  cart: Product[] = [];
  signInForm: FormGroup;
  showAddress = false;
  selectedPaymentType:string
  addressData = {
    'name':'',
    'address':'',
    'number':''
  }
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      // { type: 'pattern', message: 'Enter a valid address.' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
      // { type: 'pattern', message: 'Enter a valid address.' }
    ],
    'number': [
      { type: 'required', message: 'Contact Number is required.' },
       { type: 'pattern', message: 'Enter a valid number.' } 
    ]
  };

  changeAddress(){
    this.showAddress=false;
  }

  getAddressData(){
    this.handleButtonClick().then(()=>{
      this.addressData.address = this.signInForm.value['address'];
      this.addressData.number = this.signInForm.value['number'];
      this.addressData.name = this.signInForm.value['name'];
      
        this.showAddress = true;

    });
  
   
    
    console.log(this.addressData.address);
    console.log(this.addressData);
    console.log(this.addressData.name);
  }

  gotoPayment(){
    this.handleButtonClick();
    this.payment= true;
    this.showAddress = false;
    
  }

  paymentOptionChange(event) {
    console.log(event.detail.value);
    this.selectedPaymentType = event.detail.value;
    }
  constructor(private navCtrl: NavController,
    private cartService: CartService,
    private loadingController: LoadingController) {
    this.signInForm = new FormGroup({
      'name': new FormControl('', Validators.compose([
        Validators.required,
        // 
      ])),
      'address': new FormControl('', Validators.compose([
        Validators.required,
        // 
      ])),
      'number': new FormControl('', Validators.compose([
        Validators.pattern('[0-9]*'),
        Validators.required
      ]))
    });
   }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    // this.paymentAmount= this.cart.reduce((i, j) => i + j.price * j.amount, 0);;
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  backToCart(){
    this.navCtrl.pop();
  }
  gotoSummary(){
    this.cartService.emptyCart(this.cart);
  
    if(this.selectedPaymentType === 'cash'){
      Swal.fire(
        'Done!',
        'Your Order Is Placed!',
        'success'
      )
      this.openSummary = true;
      this.payment = false;
      this.showAddress = false;
      this.changedAddress= false;
    } else{

      if(this.selectedPaymentType === 'paytm'){
        Swal.fire(
          'Done!',
          'You have been Redirecting To Paytm!',
          'success'
        )
  
      }
      else{
        if(this.selectedPaymentType === 'UPI'){
          Swal.fire(
            'Done!',
            'You have been Redirecting To BHIM UPI!',
            'success'
          )
    
        }
        else{
          Swal.fire(
            'Oops',
            'Please Select Payment',
            'warning'
          )
        }

      }
    }
    
   
   
  
  }

  async handleButtonClick() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1500
    });
    

    await loading.present();
  }

}
