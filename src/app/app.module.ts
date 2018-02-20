import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { WindowRefService } from '../services/window-ref.service';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { SwMessageRefService } from '../services/sw-message.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatabaseComponent } from '../components/database/database.component';
import { DatabaseService } from '../services/database.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'database', component: DatabaseComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatabaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forRoot(
      appRoutes, { useHash: true }
    )
    // other imports here
  ],
  providers: [
    WindowRefService,
    SwMessageRefService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
