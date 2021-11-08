import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterModule, Routes ,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) { }    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.isLoggedIn()) {      
        return true;      
        }        
     this.router.navigate(['/login']);      
  return false;      
    
  }
  public isLoggedIn(): boolean {   
  let status = false;      
  if (localStorage.getItem('isLoggedIn') == "true") {      
     status = true;      
  }    
  else {       
     status = false;      
     }      
  return status;      
  }   
  
}
