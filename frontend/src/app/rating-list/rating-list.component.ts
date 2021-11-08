import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  ratings:any =[];
  avgratings:any =[];
  constructor(public service: ApiService ,private router: Router ) { }

  ngOnInit(): void {
    this.getrating();
    this.avgrating();
  }
  getrating(){
    this.service.getRequest(ApiUrl.RATINGGET).subscribe((data:any) => {
      this.ratings = data.data;
      console.log(data);
   });
  }

  avgrating(){
    this.service.getRequest(ApiUrl.AVGRATING).subscribe((res:any) =>{
      this.avgratings= res.data;
      console.log(res);
    })
  }
}
