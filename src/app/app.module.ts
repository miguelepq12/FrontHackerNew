import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatIconModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {NewService} from './news/new.service';


const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [NewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
