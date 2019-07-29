import { Component, HostListener, ElementRef } from '@angular/core';
import { GitApiService } from './Services/git-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  //userName = 'sherink08';
  userName = 'subhaminion';
  menu = 1;
  user : any;  profileMargin : number = 0; contentMargin : number = 0; yearMargin : number = 0;
  apiData:any;
  pageCount : number;
  constructor(private api: GitApiService,private elem: ElementRef) { }
  
  ngOnInit() {
    this.api.getUserDetails(this.userName).subscribe(data=>{
      this.user = data;
      this.user.starred =[];
        this.getStared();
    });
  }

  getStared()
  {
    this.api.getStarred(this.userName).subscribe(data=>{
      this.apiData=data;
      this.apiData.forEach(item => {
        this.user.starred.push(item);
      });
      if(this.apiData.length==this.api.pageCount)
      {
        this.getStared();
      }
    });
  }

  ngAfterViewChecked() {
    if(this.contentMargin == 0)
      this.contentMargin = document.getElementById('contentTab').getBoundingClientRect().top;
    if(this.profileMargin == 0)
      this.profileMargin = document.getElementById('profile-scroll-control').getBoundingClientRect().top;
    if(this.yearMargin == 0)
      this.yearMargin = document.getElementById('year-list-container').getBoundingClientRect().top;   
  }

  changeMenu(menuID){
    this.api.pageNumber=0;  
    this.menu = menuID;
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    if(event.target.classList.contains('search-controls'))
    {
      this.cssOperation('class','search','add','active');
      this.cssOperation('class','suggestion','add','active');
    }
    else
    {
      this.cssOperation('class','search','remove','active');
      this.cssOperation('class','suggestion','remove','active');
    }
  }

  @HostListener('window:scroll', ['$event']) scrollHandler(event) {
    this.TabScrollFunction();
    this.ProfileScrollFunction();
    this.yearScrollFunction();
  }

  TabScrollFunction(){
    if(window.pageYOffset >= this.contentMargin) {
      this.cssOperation('id','contentTab','add','sticky');
    }else {
      this.cssOperation('id','contentTab','remove','sticky');
    }
  }
  
  yearScrollFunction(){
    if(window.pageYOffset >= this.yearMargin) {
      this.cssOperation('id','year-list-container','add','sticky');
    }else {
      this.cssOperation('id','year-list-container','remove','sticky');
    }
  }

  ProfileScrollFunction(){
    if (window.pageYOffset >= this.profileMargin) {
      this.cssOperation('id','profile-scroll','remove','hide');
      this.cssOperation('id','profile-scroll','add','sticky');
    } else {
      this.cssOperation('id','profile-scroll','add','hide');
      this.cssOperation('id','profile-scroll','remove','sticky');
    }
  }

  cssOperation(elmType,ElmValue,action,classVal){
    if(elmType == 'id')
    {
      if(action == 'add')
        document.getElementById(ElmValue).classList.add(classVal);
      else 
        document.getElementById(ElmValue).classList.remove(classVal);
    }
    else if(elmType == 'class')
    {
      if(action == 'add')
        document.getElementsByClassName(ElmValue)[0].classList.add(classVal);
      else
        document.getElementsByClassName(ElmValue)[0].classList.remove(classVal);
    }
  }

}


