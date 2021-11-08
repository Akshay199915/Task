import { Component, OnInit, Output, EventEmitter ,Input} from '@angular/core';
import { Product} from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';
import { RatingComponent } from '../rating/rating.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {
 
  


   products:any =[];
  // rating:any =[]
   selectedproduct= Product;
  constructor(public service: ApiService ,private router: Router , private notifyService : NotificationService, ) { }

ngOnInit(): void {  
  
  this.getproduct();
  }

  

getproduct(){
  this.service.getRequest(ApiUrl.RATING).subscribe((resp:any) => {
    this.products = resp.data;
    console.log(this.products);
 });
}


onEdit(id:string) {
  this.service.getRequestById(ApiUrl.GETPRODUCTBYID,id).subscribe(res=>{
        this.router.navigate([`/productedit/${id}`]);  
  })
 
 }

 onDelete(id:string) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.service.deleteRequest(ApiUrl.PRODUCTDELETE,id).subscribe(data => {   
      console.log(data);
      this.notifyService.showSuccess(" Delete successfully !!", "Product Deleted")
      this.getproduct();
  //  this.selectedproduct;
   // this.router.navigateByUrl("/home");
    })
  } 
}

}
