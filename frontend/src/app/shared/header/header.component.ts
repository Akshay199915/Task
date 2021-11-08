import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthServiceService} from '../../auth/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  id: any;  
  constructor(private router: Router,  
    private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('user'); 
  }
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }  
}
