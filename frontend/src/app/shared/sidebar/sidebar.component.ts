import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthServiceService} from '../../auth/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() index:number
       id: any;  
  constructor(private router: Router,  
    private authService: AuthServiceService) { }
 
 
  ngOnInit(): void {
    console.log(this.index)
    this.id = localStorage.getItem('token');  
  }
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }  
  

}
