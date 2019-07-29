import { Component, OnInit,Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./../app.component.css']
})
export class FollowingComponent implements OnInit {

  @Input() user: any;
  following: any=[];
  pageNumber:number=0;
  perPage:number;

  constructor(private api: GitApiService) { }

  ngOnInit() {
    this.perPage = this.api.pageCount;
    this.getUserData(1);
  }

  getUserData(val){
    this.api.pageNumber +=val;
    this.pageNumber=this.api.pageNumber;
    this.api.getUserData('https://api.github.com/users/'+ this.user.login +'/following').subscribe(d=>{
      debugger;
      this.following = d;
      //this.api.pageCount =this.following.length+1;
      //this.following.forEach(item => {
        // this.api.getUserDetails(item.login).subscribe(data=>{
        //   item.userData = data;
        // });
      //});
    });
  }
}
