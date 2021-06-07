import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WipContentComponent } from './wip-content/wip-content.component';
import { WipCreateComponent } from './wip-create/wip-create.component';

const routes: Routes = [
  { path:'',redirectTo:'content'},
  { path: 'content', component: WipContentComponent },
  { path: 'create', component:WipCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WipRoutingModule {
}
