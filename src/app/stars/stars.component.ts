import { Component, OnInit, Input } from '@angular/core';
import {GitApiService} from '../Services/git-api.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./../app.component.css']
})
export class StarsComponent implements OnInit {

  @Input() user: any;
  starsDetails:any= [];
  pageNumber :number=0;
  perPage :number=0;
  curPage:number;
  masterData:any=[];
  prevDisabled :boolean=true;
  nextDisabled:boolean=true;

  constructor(private api: GitApiService) { }
  
  ngOnInit() {
    this.pageNumber = 0;
    this.perPage = this.api.pageCount;
    this.curPage =1;
    this.setStarDetails(1);
  }
  
  setStarDetails(val)
  {
    this.starsDetails=[];
    this.pageNumber+=val;
    for(var i=((this.pageNumber-1)*this.perPage);i<(this.perPage*this.pageNumber);i++)
    {
      if(i>=this.user.starred.length)
        break;
      this.starsDetails.push(this.user.starred[i]);
    }
    if(this.starsDetails.length != this.perPage || (this.starsDetails.length == this.perPage && i>this.user.starred.length ))
    {
      this.nextDisabled=true;
      this.prevDisabled=false;
    }
    else if(i<=this.perPage)
    {
      this.prevDisabled =true;
      this.nextDisabled =false;
    }
    else
    {
      this.prevDisabled =true;
      this.nextDisabled =true;
    }
    window.scrollTo(0, 0);
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
