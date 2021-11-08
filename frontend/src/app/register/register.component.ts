import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../models/user.model';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';
// import { User } from '../user.model';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordExp  = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  apiUrl :any = ApiUrl;
   selecteduser : User
  constructor( public service: ApiService, private notifyService : NotificationService) { 

   
   this.resetForm();
   
  }
    
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  this.selecteduser = {
      _id:"",
      name:"",
      email:"",
      phone:"",
      password:"",
      role:"",
     
    };
  }


  onSubmit(form: NgForm) {
  this.service.postRequest(this.apiUrl.REGISTERADMIN,form.value).subscribe((res) => {
        this.resetForm(form);
        this.notifyService.showSuccess("Register successfully !!", "Register Sucessfully");
     });
 }
 //onEdit(user: User) {
 // this.userService.selecteduser = user;
//}

//onDelete(_id: string, form: NgForm) {
 // if (confirm('Are you sure to delete this record ?') == true) {
  //  this.userService.deleteUser(_id).subscribe((res) => {
    //  this.resetForm(form);
   // }
  //  )} 
 // }
 
ngOnInit(): void {
  //this.userService.getUserList().subscribe((data) => {
  //  this.userService.users = data as User[];
 // });
}
}
