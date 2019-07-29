import { Component, OnInit, Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./../app.component.css']
})
export class FollowersComponent implements OnInit {

  @Input() user: any;
  followers: any = [];
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
    this.api.getUserData(this.user.followers_url).subscribe(d=>{
      this.followers = d;
      //this.api.pageCount =this.followers.length+1;
      // this.followers.forEach(item => {
      //   this.api.getUserDetails(item.login).subscribe(data=>{
      //     item.userData = data;
      //     window.scrollTo(0,0);
      //    });
      //  });
    });
  }
}
