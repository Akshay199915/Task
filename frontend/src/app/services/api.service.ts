import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient) { }

  postRequest(url:string,data: any) {
    return this.http.post(environment.baseUrl+url, data);
  }

  getRequestById(url:string,id:string){
    return this.http.get(environment.baseUrl+url+`${id}`)
  }

  getRequest(url:string) {
    return this.http.get(environment.baseUrl+url);  
  }
  putRequest(url:string ,id: string, data: any) {
    return this.http.put(environment.baseUrl+url+`${id}`,data);
  }

  deleteRequest(url:string,id: string) {
    return this.http.delete(environment.baseUrl+url + `${id}`);
  }

}
