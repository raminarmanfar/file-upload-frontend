import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './app.material.module';
import { AppComponent, DialogDelete } from './app.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    DialogDelete
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule    
  ],
  entryComponents: [ AppComponent, DialogDelete],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
