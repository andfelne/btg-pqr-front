import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QueryComponent} from "./components/query/query.component";
import {PetitionComponent} from "./components/petition/petition.component";
import {GrievanceComponent} from "./components/grievance/grievance.component";

const routes: Routes = [
  {path: 'petition', component: PetitionComponent},
  {path: 'grievance', component: GrievanceComponent},
  {path: 'query-pqr', component: QueryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
