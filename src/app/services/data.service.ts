import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class DataService {

    // url = 'http://127.0.0.1:8000/';
    url = 'https://akstore.herokuapp.com/'
    selectedProductId: number;
    selectedSubCategoryId: number;
    selectedProducts:any;
    productData:any;
    id:number;
    

 
  constructor(
    private http: HttpClient,
   
  ) {
  }


  getAllCategoriesData(){
    return this.http.get(this.url + 'categories/').pipe(
     catchError(this.handleError)
   );
   }

   getAllSubCategoriesData(){
    return this.http.get(this.url + 'subcategories/').pipe(
     catchError(this.handleError)
   );
   }

   getAllProductData(){
    return this.http.get(this.url + 'items/').pipe(catchError(this.handleError)
    );
   }

   getProductId(id,subCategoryId){
    this.selectedProductId = id;
    this.selectedSubCategoryId = subCategoryId

  }
  getId(id){
    this.id = id
  }

  getSelectedProducts(){
    this.selectedProducts=[];
   this.productData = [];
   this.http.get(this.url + 'items/').subscribe(
     result => {

      this.productData = result;
      for(let i= 0; i<this.productData.length;i++){
        if(this.productData[i].subcategory_id === this.id){
          this.selectedProducts.push(this.productData[i]);
         
  
        }
      }
      
      
     },
     error =>{
       console.log(error);

     }

     
   )

   return this.selectedProducts;

  }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.log("here");
      alert(error.error.non_field_errors);

    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }



}