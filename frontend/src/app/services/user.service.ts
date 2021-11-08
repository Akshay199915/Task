import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selecteduser : User;
  users : User[];
  localStorage :any;
  readonly baseURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  getUserList() {
    return this.http.get(this.baseURL);
    
  }
  putUser(user: User) {
    return this.http.put(this.baseURL + `/${user._id}` , user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  loginUser( model:User){
    return this.http.post(this.baseURL + `/login`, model)
    
   
   }
}
