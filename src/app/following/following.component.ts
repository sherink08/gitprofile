import { Component, OnInit,Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./../app.component.css']
})
export class FollowingComponent implements OnInit {

  @Input() user: any;
  following: any;

  constructor(private api: GitApiService) { }
  ngOnInit() {
    this.api.getUserData('https://api.github.com/users/'+ this.user.login +'/following').subscribe(d=>{
      this.following = d;
    });
  }
}
