import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { AuthenticationGuard } from './auth/authentication.guard'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AnimationBuilder } from '@angular/animations';
import { HttpConfigInterceptor } from '../app/interceptors/httpconfig.interceptor';

import { ToastrModule } from 'ngx-toastr';
//import { Directive } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { NotificationService} from './services/notification.service';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { AuthServiceService} from './auth/auth-service.service';
import {ProducteditComponent } from './productedit/productedit.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { RatingComponent } from './rating/rating.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { AvrratingComponent } from './avrrating/avrrating.component';
 
import { MaterialModule } from '../app/material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
   
    SidebarComponent,
    ProductGetComponent,
    ProductAddComponent,
    ProducteditComponent,
    HeaderComponent,
    HomeComponent,
    RatingComponent,
    RatingListComponent,
    AvrratingComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
    
    }) 
 
   
  ],
  providers: [UserService ,AuthServiceService,AuthenticationGuard, NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents:[RatingComponent]

})
export class AppModule { }
