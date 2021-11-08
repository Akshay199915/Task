import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { UserComponent } from './user/user.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProductGetComponent } from './product-get/product-get.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { HeaderComponent } from './shared/header/header.component';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { AvrratingComponent } from './avrrating/avrrating.component';

import { AuthenticationGuard } from './auth/authentication.guard'; 

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
 // { path: 'user', component: UserComponent ,canActivate:[AuthenticationGuard] },
   { path:'sidebar' ,component:SidebarComponent ,canActivate:[AuthenticationGuard] },
   //{ path:'product' ,component:ProductGetComponent ,canActivate:[AuthenticationGuard] },
   //{path: 'productadd', component:ProductAddComponent ,canActivate:[AuthenticationGuard]},
   {path: 'productedit/:id', component:ProducteditComponent ,canActivate:[AuthenticationGuard]},
   {path:'header', component:HeaderComponent ,canActivate:[AuthenticationGuard]},
  {path:'home', component:HomeComponent,canActivate:[AuthenticationGuard]},
   {path:'rating/:id', component:RatingComponent ,canActivate:[AuthenticationGuard]},
   {path:'ratinglist',component:RatingListComponent,canActivate:[AuthenticationGuard]},
   {path:'avgrating', component:AvrratingComponent,canActivate:[AuthenticationGuard]},
  // {path: 'home',
  // loadChildren: () =>     import('./lazy-loading/lazy-loading.module')
   //  .then(m => m.LazyLoadingModule)},
     {path: '',
     loadChildren: () =>  import('./product/product.module').then(m => m.ProductModule)}, 
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
