import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './screeens/login/login.page';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { DashboardPage } from './screeens/dashboard/dashboard.page';
import { SharedModule } from './shared/shared.module';  
import { ProductsService } from './service/products/products.service';
import { PopulationService } from './service/population/population.service';

export const firebaseConfig = {   
  apiKey: 'AIzaSyBklWbYyyB40od_xBMTEwk6KO7Z3-KZnP8',
  authDomain: 'ionpoc-fd800.firebaseapp.com',
  projectId: 'ionpoc-fd800',
  storageBucket: 'ionpoc-fd800.appspot.com',
  messagingSenderId: '579242381740',
  appId: '1:579242381740:web:dc11bf8a66eedc48b62a09',
  measurementId: 'G-V6L2RXEZC9',
};
// if(this.auth.isAuthenticated()){
//   this.defaultRoute = '/app/dashboard'
// }
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot([]),
    RouterModule.forChild([
      {
        path: '',
        component: localStorage.getItem('ionPOC_auth_token')  ? DashboardPage : LoginPage,
      },
    ]),
    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ProductsService, PopulationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

// const firebaseConfig = {
//   apiKey: "AIzaSyBklWbYyyB40od_xBMTEwk6KO7Z3-KZnP8",
//   authDomain: "ionpoc-fd800.firebaseapp.com",
//   projectId: "ionpoc-fd800",
//   storageBucket: "ionpoc-fd800.appspot.com",
//   messagingSenderId: "579242381740",
//   appId: "1:579242381740:web:dc11bf8a66eedc48b62a09",
//   measurementId: "G-V6L2RXEZC9"
// };
