import { Component, OnInit } from '@angular/core';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { AuthServiceService} from '../auth/auth-service.service';
import { Router , ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  id:any
  formm: any = {};
  emaill:any;
  userr:any
  constructor(public service: ApiService,private activatedRoute: ActivatedRoute, public router: Router,private authService: AuthServiceService, )
   {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      //console.log(this.id)
    })
  }
  
  model ={
      product_id :'',
      product_name:'',
      email:'',
      rating:null
  };

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  this.model = {
  product_id :'',
  product_name:'',
   email:'',
   rating:null
  
    };
  }
  
  getproduct(id:string){
    this.service.getRequestById(ApiUrl.GETPRODUCTBYID,id).subscribe((resp:any) => {
   // console.log(resp.data)
      this.formm ={
          _id:resp.data._id,
         product_id: resp.data.product_id,
         product_name: resp.data.product_name,
         product_price: resp.data.product_price,
         product_quantity: resp.data.product_quantity
         }

      });
      
  }

  ngOnInit(): void {
    this.getproduct(this.id);
    this.emaill = localStorage.getItem('user'); 
    console.log(localStorage.user);
     this.userr ={
         email:localStorage.user
     }
    
  }

//  onSubmit(form:NgForm){
    // this.service.postRequest(ApiUrl.RATINGADD,form.value).subscribe((res:any)=> {
  //         this.resetForm(form); 
  //               })
   //              }
   


  
       
  Submit(form:NgForm){
       this.service.postRequest(ApiUrl.RATINGADD,form.value).subscribe((res)=>{
         this.resetForm(form);
      //   this.router.navigate(['/home']);
    } )
  }
        
}
