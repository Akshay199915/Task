import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-avrrating',
  templateUrl: './avrrating.component.html',
  styleUrls: ['./avrrating.component.css']
})
export class AvrratingComponent implements OnInit {
  avgratings:any =[];
  constructor(public service: ApiService ,private router: Router ) { }

  ngOnInit(): void {
    this.avgrating();
  }
  avgrating(){
    this.service.getRequest(ApiUrl.AVGRATING).subscribe((res:any) =>{
      this.avgratings= res.data;
      console.log(res);
    })
  }
}
