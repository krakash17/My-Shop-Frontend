import { Component,OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController,NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  cart = [];
  openCounter = false;
productData: any;
cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService,
    private navCtrl: NavController,
    private router: Router) {}

  ngOnInit(){

    this.cartItemCount = this.cartService.getCartItemCount();
    this.productData = this.cartService.getProducts();
  }

  openCart(){
    this.router.navigate(['/cart']);
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

}
