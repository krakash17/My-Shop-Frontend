import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController, AlertController,NavController } from '@ionic/angular';
import { IonSearchbar} from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard';
import { CartService } from 'src/app/services/cart.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public searchTerm: string = "";
  public items: any;

  @ViewChild('mainSearchbar') searchBar: IonSearchbar;
  constructor(private navCtrl: NavController,
    private cartService: CartService,
    private route: Router
    ) { }

  ngOnInit() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.items = this.cartService.filterItems(this.searchTerm);
  }
  openProductDetail(id,subCategoryId){
    this.route.navigate(['/product-detail']);
    this.cartService.getProductId(id,subCategoryId);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
    Keyboard.show();
    
}

  backToHome(){
    this.navCtrl.pop();
    // this.navCtrl.navigateForward
    // ('/tabs/tab1')
  }

}
