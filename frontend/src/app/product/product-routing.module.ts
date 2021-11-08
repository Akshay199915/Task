import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductGetComponent } from '../product-get/product-get.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { AuthenticationGuard } from '../auth/authentication.guard'; 
const routes: Routes = [
 
  {path:'product', component:ProductGetComponent,canActivate:[AuthenticationGuard]},
  {path:'productadd', component:ProductAddComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
