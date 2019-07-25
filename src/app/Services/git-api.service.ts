import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GitApiService {
  public user: any;
  constructor(private http: HttpClient) { }
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
    return this.http.get(url);
  }

}
