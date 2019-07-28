import { Component, OnInit, Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./../app.component.css']
})
export class FollowersComponent implements OnInit {

  @Input() user: any;
  followers: any;

  constructor(private api: GitApiService) { }
  ngOnInit() {
    this.api.getUserData(this.user.followers_url).subscribe(d=>{
      this.followers = d;
    });

    
  }

}
