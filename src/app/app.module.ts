import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddContactComponent } from './component/add-contact/add-contact.component';
import { ContactService } from './service/contact.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditContactComponent } from './component/edit-contact/edit-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
