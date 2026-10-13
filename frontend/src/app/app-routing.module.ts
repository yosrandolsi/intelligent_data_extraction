import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component'; 
import { ValidateComponent } from './validate/validate.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { NavComponent } from './nav/nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HistoriqueComponent } from './historique/historique.component';
import { InvoiceHistoriqueComponent } from './invoice-historique/invoice-historique.component';
import { CINHistoriqueComponent } from './cinhistorique/cinhistorique.component';
import { DrivingLicenceHistoriqueComponent } from './driving-licence-historique/driving-licence-historique.component';//import { NavComponent } from './nav/nav.component';
import { PasseportHistoriqueComponent } from './passeport-historique/passeport-historique.component';
import { ReceiptHistoriqueComponent } from './receipt-historique/receipt-historique.component';
import { ChartsComponent } from './charts/charts.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
const routes: Routes = [
  { path: '', component: WelcomeComponent  },
  { path: 'inscription', component: InscriptionComponent },
  
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: EmployeedetailComponent },
  { path: 'inscrit', component: InscriptionComponent },
  { path: 'recuperer', component: RecupererComponent },
  { path: 'login', component: ConnexionComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: '', component: AcceuilComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'add-role/:username', component: AddRoleComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'Historique', component:HistoriqueComponent},
  { path: 'InvoiceHistorique', component:InvoiceHistoriqueComponent},
  { path: 'CINHistorique', component:CINHistoriqueComponent},
  { path: 'PasseportHistorique', component:PasseportHistoriqueComponent},
  { path: 'DrivingHistorique', component:DrivingLicenceHistoriqueComponent},
  { path: 'ReceiptHistorique', component:ReceiptHistoriqueComponent},
  { path: 'listUsers', component: ListComponent },
{path: 'uploadfile',component:UploadfileComponent },
{ path: 'pdf-viewer', component: PdfViewerComponent },
{path:'nav', component: NavComponent},
{path:'validation', component: ValidateComponent},
{path:'alert', component: ConfirmationDialogComponent},
{path:'chart', component: ChartsComponent},
{path:'list', component: ListUsersComponent},
{path:'evaluation', component: EvaluationComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
