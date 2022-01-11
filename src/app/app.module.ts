import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CRUDComponent } from './crud/ui/crud.component';
import { DomainComponent } from './domain/ui/domain.component';
import { StateComponent } from './state/ui/state.component';
import { AuthComponent } from './auth/ui/auth.component';
import { ExtrasComponent } from './extras/ui/extras.component';
import { CommandDirective } from './extras/core/command';
import { AuthService } from './auth/core/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CRUDComponent,
    DomainComponent,
    StateComponent,
    AuthComponent,
    ExtrasComponent,
    CommandDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
