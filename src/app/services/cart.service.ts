import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: string;
  image:string;
  amount:number;
  subCategoryId: number;
}
export interface Categories {
  id: number;
  name: string;
  image:string;
}
export interface SubCategories {
  id: number;
  name: string;
  image:string;
  categoryId:number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  data1: Categories[] = [
    { id: 0, name: 'Grocery & Staples', image:'assets/categories/cat1.jpg' },
    { id: 1, name: 'Personel Care',image:'assets/categories/cat2.jpg' },
    { id: 2, name: 'Dairy',image:'assets/categories/cat3.jpg'},
    { id: 3, name: 'Household Items',image:'assets/categories/cat4.jpg' },
    { id: 4, name: 'Beverages',image:'assets/categories/cat5.jpg' },
    { id: 5, name: 'Baby Care',image:'assets/categories/cat6.jpg' },
    
  ];
  data2: SubCategories[] = [

    { id: 0, name: 'Pulses', image:'assets/subcategories/Pulses.jpg',categoryId:0 },
    { id: 1, name: 'Aatta & Other Flours',image:'assets/subcategories/aata.jpg',categoryId:0 },
    { id: 2, name: 'Rice & Other Grains',image:'assets/subcategories/rice.jpg',categoryId:0},
    { id: 3, name: 'Dry Fruits & Nuts', image:'assets/subcategories/dryfruit.jpg',categoryId:0 },
    { id: 4, name: 'Edible Oils',image:'assets/subcategories/edibleoil.jpg',categoryId:0 },
    { id: 5, name: 'Ghee & Vanaspati',image:'assets/subcategories/ghee.jpg',categoryId:0},
    { id: 6, name: 'Spices',image:'assets/subcategories/spices.jpg',categoryId:0 },
    { id: 7, name: 'Salt & Sugar',image:'assets/subcategories/saltsugar.jpg',categoryId:0},


    { id: 8, name: 'Bath & Body',image:'assets/subcategories/personelcare/bathbody.jpg',categoryId:1 },
    { id: 9, name: 'Hair Care',image:'assets/subcategories/personelcare/haircare.jpg',categoryId:1 },
    { id: 10, name: 'Skin Care',image:'assets/subcategories/personelcare/skincare.jpg',categoryId:1 },
    { id: 11, name: 'Oral Care',image:'assets/subcategories/personelcare/oralcare.jpg',categoryId:1 },
    { id: 12, name: 'Fragrances',image:'assets/subcategories/personelcare/fragrances.jpg',categoryId:1 },


    { id: 13, name: 'Milk & Milk Products',image:'assets/subcategories/dairy/milk.jpg',categoryId:2 },
    { id: 14, name: 'Paneer & Curd',image:'assets/subcategories/dairy/paneer.jpg',categoryId:2 },
	{ id: 15, name: 'Breakfast Ceral & Mixes',image:'assets/subcategories/dairy/breakfast.jpg',categoryId:2 },
    { id: 16, name: 'Jams,Honey & Spreads',image:'assets/subcategories/dairy/jamshoney.jpg',categoryId:2 },
	
	
    { id: 17, name: 'Disinfectants',image:'assets/subcategories/household/disinfectant.jpg',categoryId:3 },
    { id: 18, name: 'Laundry Detergents',image:'assets/subcategories/household/detergent.jpg',categoryId:3 },
	{ id: 19, name: 'Cleaners',image:'assets/subcategories/household/cleaners.jpg',categoryId:3 },
    { id: 20, name: 'Dishwashers',image:'assets/subcategories/household/dishwashers.jpg',categoryId:3 },
	{ id: 21, name: 'Repellents',image:'assets/subcategories/household/repellents.jpg',categoryId:3 },
	
	
    { id: 22, name: 'Cold Drinks',image:'assets/subcategories/beverages/colddrink.jpg',categoryId:4 },
	{ id: 23, name: 'Juices & Drinks',image:'assets/subcategories/beverages/juices.jpg',categoryId:4 },
    { id: 24, name: 'Tea & Coffee',image:'assets/subcategories/beverages/teacoffee.jpg',categoryId:4 },
	{ id: 25, name: 'Health & Energy Drinks',image:'assets/subcategories/beverages/healthdrink.jpg',categoryId:4 },
	
    { id: 26, name: 'Baby Food',image:'assets/subcategories/babycare/download.jpg',categoryId:5 },
	{ id: 27, name: 'Diapers & Wipes',image:'assets/subcategories/babycare/diapers.jpg',categoryId:5 },
    { id: 28, name: 'Baby Skin % Hair Care',image:'assets/subcategories/babycare/babyskin.jpg',categoryId:5 },
	
    
  ];
  data3: Product[] = [
    { id: 0,
	name: 'Tata Sampann Unpolished Arhar/Toor Dal',
	amount: 0,
	price: 122,
	quantity: '1 kg',
	image:'assets/products/grocery/toordal.jpg',
	subCategoryId:0
	},
    { id: 1,
	name: 'Family Farm Moong Daal',
	price: 120,
	amount: 0,
	quantity: '1 kg',
	image:'assets/products/grocery/moongdal.jpg',
	subCategoryId:0
	},
    { id: 2,
	name: 'Tata Sampann Unpolished Black Urad',
	amount: 0,
	price: 65,
	quantity:'500 g',
	image:'assets/products/grocery/urad.jpg',
	subCategoryId:0
	},

    { id: 3,
	name: 'Aashirwad Chakki Wheat Aatta',
	price: 325,
	amount: 0,
	quantity: '10 kg',
	image:'assets/products/grocery/aashirwadaata.jpg',
	subCategoryId:1
	},
    { id: 4, 
	name: 'Fortune Chakki Aatta',
	price: 315,
	amount: 0,
	quantity: '10 kg',
	image:'assets/products/grocery/fortuneaata.jpg',
	subCategoryId:1 
	},
    { id: 5,
	name: 'Fortune Besan',
	price: 83,
	amount: 0,
	quantity: '1 kg',
	image:'assets/products/grocery/fortunebesan.jpg',
	subCategoryId:1 
	},


    { 
      id: 6,
      name: 'Indian Gate Basmati Rice',
      price: 349,
      amount: 0,
      quantity: '5 kg',
      image:'assets/products/grocery/indianrice.jpg',
      subCategoryId:2
     },
     { 
      id: 7,
      name: 'Fortune Basmati Rice',
      price: 281,
      amount: 0,
      quantity: '5 kg',
      image:'assets/products/grocery/fortunerice.jpg',
      subCategoryId:2
     },

     { 
      id: 8,
      name: 'Mother Choice Idli Rice',
      price: 57,
      amount: 0,
      quantity: '1 kg',
      image:'assets/products/grocery/motherchoiceidli.jpg',
      subCategoryId:2
     },



     { 
      id: 9,
      name: 'Family Farm Cashew',
      price: 380,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/grocery/cashew.jpg',
      subCategoryId:3
     },
     { 
      id: 10,
      name: 'Family Farm Almond',
      price: 329,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/grocery/almond.jpg',
      subCategoryId:3
     },
	  { 
      id: 11,
      name: 'Fortune Premium Kachi Ghani Mustard Oil',
      price: 122,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/grocery/fortuneoil.jpg',
      subCategoryId:4
     },
	 { 
      id: 12,
      name: 'Emami Mustard Oil',
      price: 120,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/grocery/emamioil.jpg',
      subCategoryId:4
     },
	 { 
      id: 13,
      name: 'Mother Choice Desi Ghee',
      price: 349,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/grocery/motherghee.jpg',
      subCategoryId:5
     },
	 { 
      id: 14,
      name: 'Patanjali Cow Ghee',
      price: 565,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/grocery/patanjalighee.jpg',
      subCategoryId:5
     },
	 { 
      id: 15,
      name: 'Amul Pure Ghee',
      price: 498,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/grocery/amulghee.jpg',
      subCategoryId:5
     },
      { 
      id: 16,
      name: 'Turmeric Powder ',
      price: 60,
      amount: 0,
      quantity: '250 g',
      image:'assets/products/grocery/motherturmeric.jpg',
      subCategoryId:6
     },
	  { 
      id: 17,
      name: 'MDH Chilli Powder ',
      price: 40,
      amount: 0,
      quantity: '250 g',
      image:'assets/products/grocery/mdhchilli.jpg',
      subCategoryId:6
     },
	  { 
      id: 18,
      name: 'MDH Dhania ',
      price: 50,
      amount: 0,
      quantity: '250 g',
      image:'assets/products/grocery/mdhdhania.jpg',
      subCategoryId:6
     },
	  { 
      id: 19,
      name: 'Family Farm Sugar ',
      price: 40,
      amount: 0,
      quantity: '1 Kg',
      image:'assets/products/grocery/familyfarmsugar.jpg',
      subCategoryId:7
     },
	  { 
      id: 20,
      name: 'Sugar Free Natura Diet ',
      price: 228,
      amount: 0,
      quantity: '80g',
      image:'assets/products/grocery/sugarfree.jpg',
      subCategoryId:7
     },
	  { 
      id: 21,
      name: 'Mother Choice Sulphurless  Sugar ',
      price: 42,
      amount: 0,
      quantity: '1 Kg',
      image:'assets/products/grocery/sulphurlesssugar.jpg',
      subCategoryId:7
     },
	  { 
      id: 22,
      name: 'Aashirwad salt ',
      price: 10,
      amount: 0,
      quantity: '1 Kg',
      image:'assets/products/grocery/aashirwadsalt.jpg',
      subCategoryId:7
     },
	  { 
      id: 23,
      name: 'Tata salt ',
      price: 18,
      amount: 0,
      quantity: '1 Kg',
      image:'assets/products/grocery/tatasalt.jpg',
      subCategoryId:7
     },
	 
	 
	 
	 { 
      id: 24,
      name: 'Dettol Original Handwash(Refill) ',
      price: 300,
      amount: 0,
      quantity: '3 Packs x750ml',
      image:'assets/products/Personelcare/dettolhandwash.jpg',
      subCategoryId:8
     },
	 { 
      id: 25,
      name: 'Dettol Soap ',
      price: 200,
      amount: 0,
      quantity: '4 packs',
      image:'assets/products/Personelcare/dettolsoap.jpg',
      subCategoryId:8
     },
	  { 
      id: 26,
      name: 'Savlon Liquid Hand Sanitizer ',
      price: 200,
      amount: 0,
      quantity: '2 packs',
      image:'assets/products/Personelcare/savlonsanitizer.jpg',
      subCategoryId:8
     },
	 
	 
	  { 
      id: 27,
      name: 'Bajaj Almond Hair Oil ',
      price: 200,
      amount: 0,
      quantity: '1 packs',
      image:'assets/products/Personelcare/bajajoil.jpg',
      subCategoryId:9
     },
	  { 
      id: 28,
      name: 'Head & Shoulders Silk Black Anti Dandruff Shampoo ',
      price: 510,
      amount: 0,
      quantity: '650 ml',
      image:'assets/products/Personelcare/headshampoo.jpg',
      subCategoryId:9
     },
	  { 
      id: 29,
      name: 'Sunsilk Stunning Black Shine ',
      price: 217,
      amount: 0,
      quantity: '650 ml',
      image:'assets/products/Personelcare/sunsilkshampoo.jpg',
      subCategoryId:9
     },
	  { 
      id: 30,
      name: 'Godrej Expert Rich cream Black Hair Color ',
      price: 29,
      amount: 0,
      quantity: '1 packs',
      image:'assets/products/Personelcare/haircolor.jpg',
      subCategoryId:9
     },
	 
	  { 
      id: 31,
      name: 'Vaseline Intensive Care Deep Body Lotin ',
      price: 214,
      amount: 0,
      quantity: '400 ml',
      image:'assets/products/Personelcare/vaseline.jpg',
      subCategoryId:10
     },
{ 
      id: 32,
      name: 'Ponds Magic Freshness Honey Talc ',
      price: 270,
      amount: 0,
      quantity: '400 g',
      image:'assets/products/Personelcare/pondstalc.jpg',
      subCategoryId:10
     },
	 { 
      id: 33,
      name: 'Ponds White Beauty Cream  ',
      price: 184,
      amount: 0,
      quantity: '50 g',
      image:'assets/products/Personelcare/pondscream.jpg',
      subCategoryId:10
     },
	 
	  { 
      id: 34,
      name: 'Colgate Strong Teeth Toothpaste  ',
      price: 326,
      amount: 0,
      quantity: '2 packs',
      image:'assets/products/Personelcare/colgate.jpg',
      subCategoryId:11
     },
	  { 
      id: 35,
      name: 'Patanjali Dant Kanti  ',
      price: 127,
      amount: 0,
      quantity: '200g + 100g',
      image:'assets/products/Personelcare/dantkanti.jpg',
      subCategoryId:11
     },
	  { 
      id: 36,
      name: 'Colgate sensitive soft Bristles  ',
      price: 76,
      amount: 0,
      quantity: '4 units',
      image:'assets/products/Personelcare/toothbrush.jpg',
      subCategoryId:11
     },
	 { 
      id: 37,
      name: 'Colgate Plax Fresh Mint MouthWash  ',
      price: 196,
      amount: 0,
      quantity: '500 ml',
      image:'assets/products/Personelcare/colgateplash.jpg',
      subCategoryId:11
     },
	 { 
      id: 38,
      name: 'Set Wet Cool Avatar Mens Deodrant  ',
      price: 149,
      amount: 0,
      quantity: '150 ml',
      image:'assets/products/Personelcare/setwetmen.jpg',
      subCategoryId:12
     },
	 { 
      id: 39,
      name: 'Engage Blush Womens Deodrant  ',
      price: 195,
      amount: 0,
      quantity: '50 g',
      image:'assets/products/Personelcare/engagewomanfragrance.jpg',
      subCategoryId:12
     },
	 
	 { 
      id: 40,
      name: 'Mother Dairy Milk',
      price: 50,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/Dairy/motherdairymilk.jpg',
      subCategoryId:13
     },
	 
	  { 
      id: 41,
      name: 'Amul Gold Milk',
      price: 60,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/Dairy/amulgold.jpg',
      subCategoryId:13
     },
	 
	  { 
      id: 42,
      name: 'Mother Dairy Dahi(Cup)',
      price: 50,
      amount: 0,
      quantity: '400 g',
      image:'assets/products/Dairy/motherdairydahi.jpg',
      subCategoryId:14
     },
	 
	  { 
      id: 43,
      name: 'Mother Dairy Blueberry Yougurt(Cup)',
      price: 30,
      amount: 0,
      quantity: '100 g',
      image:'assets/products/Dairy/motherdairyyoughurt.jpg',
      subCategoryId:14
     },
	 
	  { 
      id: 44,
      name: 'Dabur Honey',
      price: 356,
      amount: 0,
      quantity: '1 kg',
      image:'assets/products/Dairy/daburhoney.jpg',
      subCategoryId:16
     },
	 
	  { 
      id: 45,
      name: 'Kissan Mixed Fruit Jam',
      price: 190,
      amount: 0,
      quantity: '700 g',
      image:'assets/products/Dairy/kissanjam.jpg',
      subCategoryId:16
     },
	 
	 
	 
	 { 
      id: 46,
      name: 'Savlon Surface Disinfectant Spray',
      price: 151,
      amount: 0,
      quantity: '170  g',
      image:'assets/products/Householditems/savlonspray.jpg',
      subCategoryId:17
     },
	 
	 
	 	 { 
      id: 47,
      name: 'Dettol Fresh Lime Laundry Disinfectant',
      price: 290,
      amount: 0,
      quantity: '960 ml',
      image:'assets/products/Householditems/dettollaundarysanitizer.jpg',
      subCategoryId:17
     },
	 
	 
	 	 { 
      id: 48,
      name: 'Tide Plus Detergent Powder',
      price: 690,
      amount: 0,
      quantity: '7kg + 3kg',
      image:'assets/products/Householditems/tide.jpg',
      subCategoryId:18
     },
	 
	 
	 	 { 
      id: 49,
      name: 'Surf excel Matic Detergent Powder',
      price: 249,
      amount: 0,
      quantity: '2 Kg',
      image:'assets/products/Householditems/surfexel.jpg',
      subCategoryId:18
     },
	 
	 	 { 
      id: 50,
      name: 'Ariel Matic TopLoad Liquid Detergent',
      price: 320,
      amount: 0,
      quantity: '2 L',
      image:'assets/products/Householditems/ariel.jpg',
      subCategoryId:18
     },
	 
	 	 { 
      id: 51,
      name: 'Surf excel Matic Liquid Detergent',
      price: 209,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/Householditems/surfexeliquid.jpg',
      subCategoryId:18
     },
	 
	 
	 	 { 
      id: 52,
      name: 'Lizol Power Kitchen Cleaner',
      price: 109,
      amount: 0,
      quantity: '450 ml',
      image:'assets/products/Householditems/lizol.jpg',
      subCategoryId:19
     },
	 
	 
	 	 { 
      id: 53,
      name: 'Lixol foor Cleaner',
      price: 209,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/Householditems/lizolcleaner.jpg',
      subCategoryId:19
     },
	 
	 	 { 
      id: 54,
      name: 'Harpic Power Plus Toilet Cleaner',
      price: 125,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/Householditems/harpic.jpg',
      subCategoryId:19
     },
	 
	 
	 	 { 
      id: 55,
      name: 'Sani Fresh Ultra Shine Toilet Cleaner',
      price: 116,
      amount: 0,
      quantity: '1 L',
      image:'assets/products/Householditems/Sanitoiletcleaner.jpg',
      subCategoryId:19
     },
	 
	 	 { 
      id: 56,
      name: 'Vim Lemon Dishwash Gel ',
      price: 110,
      amount: 0,
      quantity: '800 ml',
      image:'assets/products/Householditems/vimcleaner.jpg',
      subCategoryId:20
     },
	  { 
      id: 57,
      name: 'Exo Ginger Twist Round Dishwash Bar ',
      price: 50,
      amount: 0,
      quantity: '700g',
      image:'assets/products/Householditems/exo.jpg',
      subCategoryId:20
     },
	  { 
      id: 58,
      name: 'Vim Lemon Dishwash Bar ',
      price: 20,
      amount: 0,
      quantity: '300g',
      image:'assets/products/Householditems/vim.jpg',
      subCategoryId:20
     },
	 
	 { 
      id: 59,
      name: 'Happy Home Steel Scrub Pad ',
      price: 20,
      amount: 0,
      quantity: '1 unit',
      image:'assets/products/Householditems/scrub.jpg',
      subCategoryId:20
     },
	 
	 { 
      id: 60,
      name: 'All Out Mosquito Repellent ',
      price: 299,
      amount: 0,
      quantity: '6x45ml',
      image:'assets/products/Householditems/allout.jpg',
      subCategoryId:21
     },
	 
	 	 { 
      id: 61,
      name: 'Hit Flies & Mosquitos Black Insect Killer',
      price: 240,
      amount: 0,
      quantity: '700 ml',
      image:'assets/products/Householditems/kalahit.jpg',
      subCategoryId:21
     },
	 
	 	 { 
      id: 62,
      name: 'Baygon Cockroach Killer(Spray)',
      price: 140,
      amount: 0,
      quantity: '400 ml',
      image:'assets/products/Householditems/baygon.jpg',
      subCategoryId:21
     },
	 
	 	 { 
      id: 63,
      name: 'Hit Mosquito Bat',
      price: 450,
      amount: 0,
      quantity: '1 unit',
      image:'assets/products/Householditems/hitbat.jpg',
      subCategoryId:21
     },
	 
	 
	  { 
      id: 64,
      name: 'Frooti Mango Drinl(Bottle)',
      price: 99,
      amount: 0,
      quantity: '2.25 L',
      image:'assets/products/Beverages/frooti.jpg',
      subCategoryId:22
     },
	  { 
      id: 65,
      name: 'Appy Fizz(Can)',
      price: 25,
      amount: 0,
      quantity: '250 ml',
      image:'assets/products/Beverages/appyfizz.jpg',
      subCategoryId:22
     },
	 
	  { 
      id: 66,
      name: 'Thumsup Cold Drink',
      price: 80,
      amount: 0,
      quantity: '2 l',
      image:'assets/products/Beverages/thumsup.jpg',
      subCategoryId:22
     },
	 
	  { 
      id: 67,
      name: 'Coca Cola Soft Drink(Can)',
      price: 75,
      amount: 0,
      quantity: '3 unit',
      image:'assets/products/Beverages/cocacola.jpg',
      subCategoryId:22
     },
	 
	  { 
      id: 68,
      name: 'Real Mix Fruit Juice(Tetra)',
      price: 80,
      amount: 0,
      quantity: '1 l',
      image:'assets/products/Beverages/realmixedfruit.jpg',
      subCategoryId:23
     },
	 { 
      id: 69,
      name: 'Tang Orange Drink Powder',
      price: 75,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/Beverages/tang.jpg',
      subCategoryId:23
     },
	 
	  { 
      id: 70,
      name: 'B-Natural Fruit Mix Juice',
      price: 90,
      amount: 0,
      quantity: '1 l',
      image:'assets/products/Beverages/bnatural.jpg',
      subCategoryId:23
     },
	 
	 { 
      id: 71,
      name: 'Tajmahal Tea',
      price: 90,
      amount: 0,
      quantity: '250 g',
      image:'assets/products/Beverages/tajmahal.jpg',
      subCategoryId:24
     },
	 
	  { 
      id: 72,
      name: 'Tata Tea Premium Tea',
      price: 65,
      amount: 0,
      quantity: '250 g',
      image:'assets/products/Beverages/tatatea.jpg',
      subCategoryId:24
     },
	 
	  { 
      id: 73,
      name: 'Nescafe Coffee Powder',
      price: 150,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/Beverages/nescafe.jpg',
      subCategoryId:24
     },
	  { 
      id: 74,
      name: 'Bru Gold Coffee Powder',
      price: 90,
      amount: 0,
      quantity: '250 g',
      image:'assets/products/Beverages/bru.jpg',
      subCategoryId:24
     },
	 
	  { 
      id: 75,
      name: 'Bourn Vita Energy Booster ',
      price: 120,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/Beverages/bornbita.jpg',
      subCategoryId:25
     },
	 
	  { 
      id: 76,
      name: 'Complan Energy Booster',
      price: 150,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/Beverages/complain.jpg',
      subCategoryId:25
     },
	 
	  { 
      id: 77,
      name: 'PediaSure Energy Booster',
      price: 200,
      amount: 0,
      quantity: '500 g',
      image:'assets/products/Beverages/pediasure.jpg',
      subCategoryId:25
     },
 { 
      id: 78,
      name: 'Nstle Lactogen 1 Infant Formula(0-6 months)',
      price: 330,
      amount: 0,
      quantity: '400 g',
      image:'assets/products/Babycare/lactogen6m.jpg',
      subCategoryId:26
     },
	 
	 { 
      id: 79,
      name: 'Nstle Lactogen 1 Follow Up Infant Formula(After 6 months)',
      price: 320,
      amount: 0,
      quantity: '400 g',
      image:'assets/products/Babycare/lactogen1year.jpg',
      subCategoryId:26
     },
	 
	 { 
      id: 80,
      name: 'Nstle Cerelac With Milk Wheat Baby Ceral',
      price: 235,
      amount: 0,
      quantity: '300 gm',
      image:'assets/products/Babycare/cerelac.jpg',
      subCategoryId:26
     },
	 { 
      id: 81,
      name: 'Pampers Baby Dry Pants Diaper(XL)',
      price: 731,
      amount: 0,
      quantity: '56 units',
      image:'assets/products/Babycare/pampers.jpg',
      subCategoryId:27
     },
	  { 
      id: 82,
      name: 'Happy Baby Diaper Pants(L)',
      price: 529,
      amount: 0,
      quantity: '2x34 units',
      image:'assets/products/Babycare/diaperpant.jpg',
      subCategoryId:27
     },
	 
	  { 
      id: 83,
      name: 'Huggies Wonder pants Diaper(XS)',
      price: 144,
      amount: 0,
      quantity: '24 units',
      image:'assets/products/Babycare/hugies.jpg',
      subCategoryId:27
     },
	 
	  { 
      id: 84,
      name: 'Johnsons No More Tears Baby Shampoo',
      price: 324,
      amount: 0,
      quantity: '475 ml',
      image:'assets/products/Babycare/johnsonshampoo.jpg',
      subCategoryId:28
     },
	 
	  { 
      id: 85,
      name: 'Johnsons Baby Soap',
      price: 86,
      amount: 0,
      quantity: '150g',
      image:'assets/products/Babycare/johnsonsoap.jpg',
      subCategoryId:28
     },
	  { 
      id: 86,
      name: 'Johnsons Baby Hair Oil',
      price: 225,
      amount: 0,
      quantity: '150 ml',
      image:'assets/products/Babycare/johnsonoil.jpg',
      subCategoryId:28
     },
	  { 
      id: 84,
      name: 'Johnsons Baby Cream',
      price: 138,
      amount: 0,
      quantity: '100 g',
      image:'assets/products/Babycare/johnsoncream.jpg',
      subCategoryId:28
     },
	 
	 
	 
	 
     



    // { id: 4, name: 'Potato', price: 8.99, quantity: '',image:'assets/dettol.jpg',subCategoryId:3 },
    // { id: 5, name: 'Amul Milk', price: 5.49, quantity: '',image:'assets/maggi.jpg',subCategoryId:4 },
    // { id: 6, name: 'Ghee', price: 4.99, quantity: '',image:'assets/cocacola.jpg',subCategoryId:4 },
    // { id: 7, name: 'Amul Paneer', price: 6.99, quantity: '',image:'assets/bread.png',subCategoryId:5 }
  ];

  updateProducts(productData){
    this.data3.push(productData);
    console.log(this.data3)
  }
  selectedProducts=[]
  
 id: number;
 selectedProductId:number;
 selectedSubCategoryId:number;
 url = 'http://127.0.0.1:8000/';
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor(
    private dataService: DataService,
    private http: HttpClient  ) {}

  getId(id){
    this.id = id
  }
  
  filterItems(searchTerm) {
    return this.data3.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getProductId(id,subCategoryId){
    this.selectedProductId = id;
    this.selectedSubCategoryId = subCategoryId

  }
  getSelectedProducts(){
    this.selectedProducts=[]
    for(let i= 0; i<this.data3.length;i++){
      if(this.data3[i].subCategoryId === this.id){
        this.selectedProducts.push(this.data3[i]);

      }
    }
    return this.selectedProducts;
  }
 
productData: any;
 
  getProducts() {

this.http.get(this.url).subscribe(
  result =>{
    this.productData = result;

  }
)
  
    
  }
  getCategories() {
    return this.data1;
    
  }
  getSubCategories() {
    return this.data2;
    
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    
    
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.item_amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.item_amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  emptyCart(cart){
   for(let i = 0; i< this.productData.length; i++){
     for(let j = 0; j< cart.length; j++){
       if(this.productData[i].id === cart[j].id){
         this.productData[i].item_amount = 0;
       }
     }
   }
    this.cart = [];
    this.cartItemCount.next(0);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.item_amount -= 1;
        if (p.item_amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.item_amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
