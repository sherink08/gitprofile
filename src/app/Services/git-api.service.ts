import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GitApiService {
  public user: any;
  constructor(private http: HttpClient) { }
  public pageCount:number=30;
  pageNumber:number=0;
  ngOninit()
  {
    this.pageNumber=0;
  }
  ping(): string
  {
    return 'pong';
  }
  getUserDetails(user: string)
  {
   return this.http.get('http://api.github.com/users/'+user);
  }
  getUserData(url: string)
  {

    var query ='?per_page='+this.pageCount+'&page='+this.pageNumber;
    return this.http.get(url+query);
  }
  getStarred(user:string)
  {
    this.pageNumber+=1;
    return this.http.get('https://api.github.com/users/'+user+'/starred?per_page='+this.pageCount+'&page='+this.pageNumber)
  }

}
