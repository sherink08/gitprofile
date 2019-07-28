import { Component, OnInit, Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';
import { debug } from 'util';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./../app.component.css']
})
export class RepoComponent implements OnInit {
  @Input() user: any;
  tempRepos:any;
  repos: any=[];
  pageNumber:number=0;
  perPage:number;

  constructor(private api: GitApiService) { }

  ngOnInit() {
    this.perPage = this.api.pageCount;
    this.getRepoData(1);
  }

  getRepoData(val)
  {
    this.api.pageNumber +=val;
    this.pageNumber=this.api.pageNumber;//for buttons controlling
    this.api.getUserData(this.user.repos_url).subscribe(d=>{
      this.repos = d;
      window.scrollTo(0, 0);
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
