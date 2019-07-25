import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepoComponent } from './repo/repo.component';
import { StarsComponent } from './stars/stars.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';


@NgModule({
  declarations: [
    AppComponent,
    RepoComponent,
    StarsComponent,
    FollowersComponent,
    FollowingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
