import { Component, OnInit, Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./../app.component.css']
})
export class StarsComponent implements OnInit {

  @Input() user: any;
  starsDetails: any;

  constructor(private api: GitApiService) { }
  ngOnInit() {
    this.api.getUserData('https://api.github.com/users/'+ this.user.login +'/starred').subscribe(d=>{
      this.starsDetails = d;
    });
  }

  getDate(dat){
    dat = new Date(dat);
    if(dat.getMonth() == new Date().getMonth() && dat.getFullYear() == new Date().getFullYear() && dat.getDate() == new Date().getDate())
      return 'Updated '+ dat.getHours().toString() + ' hours ago';
    else if(dat.getMonth() == new Date().getMonth() && dat.getFullYear() == new Date().getFullYear())
      return 'Updated '+ dat.getDate().toString()+ ' days ago';
    else if(dat.getFullYear() == new Date().getFullYear())
      return 'Updated on '+ dat.toString().split(' ')[1] + ' ' + dat.toString().split(' ')[2];
    else
      return 'Updated on '+ dat.toString().split(' ')[1] + ' ' + dat.toString().split(' ')[2] + ' ' + dat.toString().split(' ')[3];
  }
}
