import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, UserComponent, UserDetailComponent, UserListComponent } from './pages';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', component: UserListComponent },
      { path: ':id', component: UserDetailComponent },
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
