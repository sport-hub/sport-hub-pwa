import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'user', loadChildren: 'src/app/modules/user/user.module#UserModule'},
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes/*, { useHash: true}*/)]
})
export class AppRoutingModule {}
