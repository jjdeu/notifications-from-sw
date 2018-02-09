import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { WindowRefService } from '../services/window-ref.service';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SwMessageRefService } from '../services/sw-message.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    WindowRefService,
    SwMessageRefService
  ],
  bootstrap: [HomeComponent]
})
export class AppModule {
}
