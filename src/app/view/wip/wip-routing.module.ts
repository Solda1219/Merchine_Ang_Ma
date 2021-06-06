import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WipContentComponent } from './wip-content/wip-content.component';

const routes: Routes = [
  { path:'',redirectTo:'content'},
  { path: 'content',component: WipContentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WipRoutingModule {
}
