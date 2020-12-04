import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController,NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private cartService: CartService,
    private dataService: DataService,private router: Router ,private navCtrl:NavController) { }
  cart = [];
  openCounter = false;
productData:any;
subCategories:any;
selectedCategory:string;
subCategoryName: string;
cartItemCount: BehaviorSubject<number>;
  ngOnInit() {
    this.dataService.getAllSubCategoriesData().subscribe(
      result =>{
        this.subCategories = result;
      },
      error =>{
        console.log(error)
      }
    );
    this.cartItemCount = this.cartService.getCartItemCount();
    this.productData= this.dataService.getSelectedProducts();
    this.getSubCategoryName();
    // console.log(this.productData)
    // this.getCategoryName();
    // this.subCategory = this.cartService.getCategories();
  }
  openCart(){
    this.router.navigate(['/cart']);
  }
  backToSubCategories(){
    // this.router.navigate(['/categories']);
    this.navCtrl.pop();


  }

  getSubCategoryName(){
    this.subCategories = []
    
    for(let i = 0;i<this.subCategories.length;i++){
      if(this.subCategories[i].id === this.productData[0].subcategory_id){
        this.subCategoryName = this.subCategories[i].subcategory_name;
        break;
      }
    }
  }
  openProductDetail(id,subCategoryId){
    this.router.navigate
    (['/product-detail'])
    this.cartService.getProductId(id,subCategoryId);
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

}
