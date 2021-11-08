import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { 
    
  }
  getToken(): any {
      return localStorage.getItem('x-access-token');
  }
    
  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
   
    localStorage.removeItem('user');    
    localStorage.removeItem('x-access-token');
    }  

   
}
