

import { Component, OnInit, ViewChild,OnDestroy, AfterViewInit,ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController,NavController } from '@ionic/angular';

import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject, from } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import {CartService} from '../services/cart.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import {UsersService} from '../services/user.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; 
  user: any;
  cart = [];
  openCounter = false;
  event;
  secondTab = false;
  firstTab = true;
  products: any;
  bestProducts:any;
  cartItemCount: BehaviorSubject<number>;
 
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  
 
  ngOnInit() {
    
  
    // this.http.get(this.url, this.options).subscribe(
    //   result => {

    //     console.log(result)
    //     // Here we are storing the token and refresh token in the localstorage
    //     // localStorage.setItem('token', result['access']);
    //     // localStorage.setItem('refresh', result['refresh']);
    //     // this.router.navigate(['/tabs/tab1']);
    //   },

    //   error => {
    //     console.log('error');
    //   }
    // );
   this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.editUser(this.user);
    
     this.dataService.getAllProductData().subscribe(
      result =>{
        this.products = result;
        this.selectBestProduct();
      },
      error =>{
        console.log(error);
      }
    );
    
    
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    // this.userService.castUser.subscribe(user => this.user = user);
    
    // this.user = JSON.parse(localStorage.getItem('currentUser'));

    //  var email = this.user.email;
   
  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  selectBestProduct(){
    var products = [];
    this.bestProducts = []
    products = this.products;
    for(let i= 0; i<products.length; i++){
      if(i % 4 === 0){
        this.bestProducts.push(products[i]);

      }
    }
    return this.bestProducts
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  gotoSearch(){
    this.router.navigate(['/search']);
  }

  gotoLocation(){
    this.router.navigate(['/location']);

  }
  openCart(){
    this.router.navigate(['/cart']);
  }
  goToCategories(){
    this.router.navigate(['/categories']);
  }
    addToCart(product) {
    this.cartService.addProduct(product);
    this.openCounter = true
    // this.animateCSS('tada');
  }
  openDetail(id,subCategoryId){
    this.navCtrl.navigateForward
    ('/product-detail')
    this.cartService.getProductId(id,subCategoryId);
  }
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  logout(){
    // this.authService.signOut().subscribe(() => {
    //   // Sign-out successful.
    //   this.router.navigate(['login']);
    //   localStorage.clear();
    // }, (error) => {
    //   console.log('signout error', error);
    // });

  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  constructor(private platform: Platform,
    private route: ActivatedRoute,
    private authService: FirebaseAuthService,
    private router: Router,
    private userService:UsersService,
    private cartService: CartService,
    private dataService: DataService,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    
  ) {}

}
