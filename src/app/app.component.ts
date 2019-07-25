import { Component } from '@angular/core';
import {GitApiService} from './Services/git-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  //userName = 'sherink08';
  userName = 'subhaminion';
  menu = 1 ;
  user: any;
  constructor(private api: GitApiService) { }
  ngOnInit() {
    this.api.getUserDetails(this.userName).subscribe(data=>{
      this.user = data;
     // this.api.getUserDetails(this.user.)
    });
  }
   changeMenu(menuID){
      this.menu = menuID;
   }
}


