import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiUrl } from '../services/apiUrl';
import { ApiService } from '../services/api.service';
import { MaterialModule } from '../material/material.module';
import { RatingComponent } from '../rating/rating.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any =[];
  id:any;
  constructor(public service: ApiService ,private activatedRoute: ActivatedRoute,private router: Router ,public dialog: MatDialog ){ 
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    //  console.log(this.id)
    })
  }

  openDialog(id:string): void {
    const dialogRef = this.dialog.open(RatingComponent, {
    
      width: '300px',
      height: '250px'
   
    });
  
       

    dialogRef.afterClosed().subscribe(res => {
   //   this.color = res;
    });
  }



  ngOnInit(): void {
    this.getproduct();
    this.onEdit(this.id);
   
   
  }
  getproduct(){
    this.service.getRequest(ApiUrl.PRODUCTGET).subscribe((data:any) => {
      this.products = data.data;
     
   });
  }
  onEdit(id:string) {
    this.service.getRequestById(ApiUrl.GETPRODUCTBYID,id).subscribe((res:any)=>{
        // this.router.navigate([`/rating/${id}`]); 
        
           
    })
 }
 


}
