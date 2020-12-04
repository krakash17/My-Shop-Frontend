import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FirebaseAuthService } from './services/firebase-auth.service';
import {UsersService} from './services/user.service';
import {CartService} from './services/cart.service';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../app/pages/auth/interceptor';

import { AuthGuardService } from './pages/auth/auth-guard.service';
import { AuthService } from './pages/auth/auth.service';
import { DataService } from './services/data.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

export function tokenGetter() {
  return localStorage.getItem('token');
}
 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,HttpClientModule,
 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['example.com/examplebadroute/']
      }
    })],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseAuthService,
    UsersService,
    CartService,
    DataService,
    Geolocation,
    NativeGeocoder,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: Interceptor,
    //   multi: true
    // },
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
