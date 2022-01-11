import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CRUDComponent } from './crud/ui/crud.component';
import { DomainComponent } from './domain/ui/domain.component';
import { StateComponent } from './state/ui/state.component';
import { AuthComponent } from './auth/ui/auth.component';
import { ExtrasComponent } from './extras/ui/extras.component';

const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'crud', component: CRUDComponent},  
  {path: 'domain', component: DomainComponent},
  {path: 'state', component: StateComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'extras', component: ExtrasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
