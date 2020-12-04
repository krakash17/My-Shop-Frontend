import { Product, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController,NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  paymentAmount;
  currency: string = 'USD';
  currencyIcon: string = '$';
  cart :any;
  cartItemCount: BehaviorSubject<number>;
  
 
  constructor(private cartService: CartService,private navCtrl:NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  
  backToHome(){
    this.navCtrl.pop();
    // this.navCtrl.navigateForward
    // ('/tabs/tab1')
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    // this.paymentAmount= this.cart.reduce((i, j) => i + j.price * j.amount, 0);;
    return this.cart.reduce((i, j) => i + j.price * j.item_amount, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    // console.log("Pay ????");
    // this.payPal.init({
    //   PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    //   PayPalEnvironmentSandbox: 'AS_kILDgm9y37konpqeTmNyP76kQV8XHjtIIzFawXgAjtwZ7ROKQVz8KhrnSgasPOJYgFZ84sTcQVwng'
    // }).then(() => {
    //   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    //   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    //     // Only needed if you get an "Internal Service Error" after PayPal login!
    //     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    //   })).then(() => {
    //     let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
    //     this.payPal.renderSinglePaymentUI(payment).then((res) => {
    //       console.log(res);
    //       // Successfully paid

    //       // Example sandbox response
    //       //
    //       // {
    //       //   "client": {
    //       //     "environment": "sandbox",
    //       //     "product_name": "PayPal iOS SDK",
    //       //     "paypal_sdk_version": "2.16.0",
    //       //     "platform": "iOS"
    //       //   },
    //       //   "response_type": "payment",
    //       //   "response": {
    //       //     "id": "PAY-1AB23456CD789012EF34GHIJ",
    //       //     "state": "approved",
    //       //     "create_time": "2016-10-03T13:33:33Z",
    //       //     "intent": "sale"
    //       //   }
    //       // }
    //     }, () => {
    //       // Error or render dialog closed without being successful
    //     });
    //   }, () => {
    //     // Error in configuration
    //   });
    // }, () => {
    //   // Error in initialization, maybe PayPal isn't supported or something else
    // });

    //  Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
