import { Component, OnInit } from '@angular/core';
import {CartService} from './../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  openCounter = false;
  productId: number;
  subCategoryId:number;
  cart = [];
  selectedCategoryProducts =  [];
  selectedProduct: [];
  products:any;
  cartItemCount: BehaviorSubject<number>;
  constructor(private cartService: CartService,
    private dataService: DataService,public navCtrl: NavController, private router: Router,) { }

  ngOnInit() {
    this.dataService.getAllProductData().subscribe(
      result =>{
        this.products = result;
      },
      error =>{
        console.log(error)
      }
    );
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.productId = this.cartService.selectedProductId;
    this.subCategoryId = this.cartService.selectedSubCategoryId;
    this.getProductDetail();
  }
  openCart(){
    this.router.navigate(['/cart']);
  }
  backToHome(){
    this.navCtrl.pop();

  }

  getProductDetail(){
    for(let i of this.products){
      if(this.productId === i.id){
        this.selectedProduct = i
        break;
      }
      
    }
    this.selectedCategoryProducts = [];
    for(let i of this.products){
       if(this.subCategoryId=== i.subCategoryId && this.productId != i.id){
          this.selectedCategoryProducts.push(i);
        }
      
    }
  }

  openDetail(id){
    this.productId = id;
    this.getProductDetail();
  }
  addToCart(product) {
    this.cartService.addProduct(product);
    this.openCounter = true
    // this.animateCSS('tada');
  }
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  // getSelectedCategoryProduct(){
  //   for(let i = 0; i<this.products.length; i++){
  //     if(this.selectedProduct. === this.products[i].id){
  //       this.selectedCategoryProducts.push()
  //     }
  //   }
  // }

}

