import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CRUDComponent } from './crud/ui/crud.component';
import { DomainComponent } from './domain/ui/domain.component';
import { HomeComponent } from './home/home.component';
import { StateComponent } from './state/ui/state.component';

const routes: Routes = [
  {path: '', component: HomeComponent},  
  {path: 'crud', component: CRUDComponent},  
  {path: 'domain', component: DomainComponent},
  {path: 'state', component: StateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
