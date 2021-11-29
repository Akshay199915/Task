import { Component, OnInit , ViewChild} from '@angular/core';
import { Product } from '../models/product.model';
import { ApiService } from '../services/api.service';
import { ApiUrl }  from '../services/apiUrl';
import { NgForm  } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})


export class ProducteditComponent implements OnInit {
  id:string;
  products:any =[];
  selectedproduct : Product;
  form: any = {};

  constructor(public service: ApiService,private router: Router,private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params => {
   this.id = params.id;
   console.log(this.id)
    });
 
  }
  ngOnInit(): void {
    this.resetForm();
     this.getproduct(this.id);
  }
   

  resetForm(form?: NgForm) {
    if (form)
    
  this.selectedproduct = {
      _id:"",
      product_id:"",
      product_name:"",
      product_price:"",
      product_quantity:"",
     
    };
  }

  getproduct(id:string){
    this.service.getRequestById(ApiUrl.GETPRODUCTBYID,id).subscribe((resp:any) => {
      this.form ={
        _id:resp.data._id,
         product_id: resp.data.product_id,
         product_name: resp.data.product_name,
         product_price: resp.data.product_price,
         product_quantity: resp.data.product_quantity
        }
      });
  }
 
onSubmit(form:NgForm) {   
  this.service.putRequest(ApiUrl.PRODUCTEDIT,this.id,form.value ).subscribe((data:any )=>{
    this.resetForm(form);
    console.log(data)
   //this.selectedproduct;
  //  this.router.navigate(['/product']);
  // console.log(data);   
 })
 }


}
