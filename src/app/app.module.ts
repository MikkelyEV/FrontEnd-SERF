import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { DataService } from 'src/services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
