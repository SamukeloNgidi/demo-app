import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //bring in the http client app module
    FormsModule //for using forms
  ],
  providers: [UserService], //inject the service
  bootstrap: [AppComponent]
})
export class AppModule { }
