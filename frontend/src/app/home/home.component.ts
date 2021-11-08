import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(public service: ApiService ,private router: Router ,public dialog: MatDialog ){ }

  openDialog(id:string): void {
    


     const dialogRef = this.dialog.open(RatingComponent, {
    
      width: '300px',
      height: '270px'
   
    });
 //   this.router.navigate([`/rating/${id}`]);  
    dialogRef.afterClosed().subscribe(res => {
   //   this.color = res;
    });
  }



  ngOnInit(): void {
    this.getproduct();
    
   
  }
  getproduct(){
    this.service.getRequest(ApiUrl.PRODUCTGET).subscribe((data:any) => {
      this.products = data.data;
     
   });
  }
  onEdit(id:string) {
    this.service.getRequestById(ApiUrl.GETPRODUCTBYID,id).subscribe((res:any)=>{
          this.router.navigate([`/rating/${id}`]); 
           
    })
   
   
   }


}
