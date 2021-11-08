import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
 
  selectedproduct: Product;
  constructor(public service: ApiService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  this.selectedproduct = {
      _id:"",
      product_id:"",
      product_name:"",
      product_price:"",
      product_quantity:"",
     
    };
  }
 

  onSubmit(form: NgForm) {
  this.service.postRequest(ApiUrl.PRODUCTADD,form.value).subscribe((res) => {
        this.resetForm(form);
     //   this.toastr.success("Data shown successfully !!", "Data shown successfully !!");
     this.router.navigate(['/product'])

       })
   

}
}
