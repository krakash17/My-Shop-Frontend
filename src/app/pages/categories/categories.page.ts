import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {CartService,Categories,SubCategories} from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
// import {DatabaseService,Categories} from '../../services/database.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories:any;
  selectedSubCategories = []
  subCategories:any;
  itemList = false;
  selectedCategory:string;
  cartItemCount: BehaviorSubject<number>;
  constructor(private navCtrl:NavController,
    private dataService: DataService,
    
    private cartService: CartService,private router: Router) { }

  ngOnInit() {
   this.dataService.getAllCategoriesData().subscribe(
     result =>{
       this.categories = result;
     },
     error =>{
       console.log(error)
     }
   );
  this.cartItemCount = this.cartService.getCartItemCount();
  
  this.dataService.getAllSubCategoriesData().subscribe(
    result =>{
      this.subCategories = result;
    },
    error =>{
      console.log(error)
    }
  );
  }
  // ngOnInit() {
  //   this.db.getDatabaseState().subscribe(rdy => {
  //     if (rdy) {
  //       this.db.getCategories().subscribe(data => {
  //         this.categories = data;
  //       })
  //       this.cartItemCount = this.cartService.getCartItemCount();
        // this.products = this.db.getProducts();
  //     }
  //   });
  // }
  openCart(){
    this.router.navigate(['/cart']);
  }
  openSubCategories(id){
    this.itemList = true;
 this.selectedSubCategories = []
    for(let i= 0;i<this.categories.length;i++){
   if(this.categories[i].id === id){
     this.selectedCategory = this.categories[i].category_name;
   }
    }
    for(let i = 0; i<this.subCategories.length;i++){
      if(this.subCategories[i].category_id === id){
        this.selectedSubCategories.push(this.subCategories[i]);
      
        


      }
    }
  // this.db.getSubCategory().subscribe(data => {
  //   this.subCategories = data;
  // })
    
  }
  goToProducts(id){
    this.router.navigate(['/products']);
    this.dataService.getId(id);
    

  }
  backToCategories(){
    this.itemList = false;
  }
  backToHome(){
    this.navCtrl.navigateForward
    ('/tabs/tab1')
  }
  

}
