import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  constructor(public userService: UserService) {
    this.resetForm();
   }
  //users : User[];

  ngOnInit(): void {
   
    this.userService.getUserList().subscribe((data) => {
      this.userService.users = data as User[];
    });
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  this.userService.selecteduser = {
      _id:"",
      name:"",
      email:"",
      phone:"",
      password:"",
      role:""
    };
  }
  onEdit(user: User) {
    this.userService.selecteduser = user;
  }
  
  
 }

