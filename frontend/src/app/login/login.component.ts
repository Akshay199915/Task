import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ApiUrl }  from '../services/apiUrl';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';  
import { AuthServiceService} from '../auth/auth-service.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: ApiService,   private router: Router,  private notifyService : NotificationService,
    private authService: AuthServiceService  ) { }
    logins:any =[];
  tokenn:any=[];
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordExp  = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

 
  model ={
    email :'',
    password:''
  };

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  this.model = {
          email:"",  
        password:"" 
     
    };
  }
 
  ngOnInit(): void {
    //this.getUser();
  }

  getUser(){
   this.service.getRequest(ApiUrl.GETUSER).subscribe((data:any) => {
      this.logins = data.data;
    })
  }
 onSubmit(form: NgForm) {
     this.service.postRequest(ApiUrl.LOGINADMIN,form.value).subscribe((res:any)=> {
       this.tokenn = res.token;
       
      console.log(this.tokenn);
        if(res.success){
          this.resetForm(form);   
          localStorage.setItem('user',(res.data.name));
          localStorage.setItem('isLoggedIn', "true");  
          localStorage.setItem('x-access-token', res['token']); 
          this.notifyService.showSuccess("Login successfully !!", "Welcome")
          this.router.navigate(['/home']);
        }else{
        
            this.notifyService.showError("Something is wrong", "Invalid username and password")
      
          console.log(res);
        }
        });
    
  }
}
//let formValue = JSON.parse(localStorage.getItem('form-data'))

