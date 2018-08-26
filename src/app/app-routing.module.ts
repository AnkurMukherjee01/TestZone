import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { McqTestComponent } from "./mcq-test/mcq-test.component";
import { HomeComponent } from "./home/home.component";
import {AdminComponent} from "./admin/admin.component";
import { McqGiveTestComponent } from "./mcq-give-test/mcq-give-test.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'mcq',
    component: McqTestComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'mcqTest/:testName/:assignedDate',
    component:McqGiveTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
