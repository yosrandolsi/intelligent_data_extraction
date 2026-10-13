import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { ErrorComponent } from './error/error.component';
import { ListComponent } from './list/list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PdfViewerModule } from 'ng2-pdf-viewer'; 
import { WelcomeComponent } from './welcome/welcome.component'; // Import PDFPageViewModule
import { ReactiveFormsModule } from '@angular/forms';
import { WebsocketModule } from 'websocket.module';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component'; 
import { ToastrModule } from 'ngx-toastr';
import { ValidateComponent } from './validate/validate.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { NavComponent } from './nav/nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HistoriqueComponent } from './historique/historique.component';
import { InvoiceHistoriqueComponent } from './invoice-historique/invoice-historique.component';
import { CINHistoriqueComponent } from './cinhistorique/cinhistorique.component';
import { PasseportHistoriqueComponent } from './passeport-historique/passeport-historique.component';
import { DrivingLicenceHistoriqueComponent } from './driving-licence-historique/driving-licence-historique.component';
import { ReceiptHistoriqueComponent } from './receipt-historique/receipt-historique.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatCardModule } from '@angular/material/card';
import { ChartsComponent } from './charts/charts.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EvaluationComponent } from './evaluation/evaluation.component';


@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    RecupererComponent,
    EmployeedetailComponent,
    ConnexionComponent,
    
    NavbarComponent,
    AcceuilComponent,
    ProfileComponent,
    UsersComponent,
    UploadfileComponent,
    ErrorComponent,
    ListComponent,
    WelcomeComponent,
    PdfViewerComponent,
    ValidateComponent,
    AddRoleComponent,
    NavComponent,
    ConfirmationDialogComponent,
    HistoriqueComponent,
    InvoiceHistoriqueComponent,
    CINHistoriqueComponent,
    PasseportHistoriqueComponent,
    DrivingLicenceHistoriqueComponent,
    ReceiptHistoriqueComponent,
    
    DashboardComponent,
          ChartsComponent,
          ListUsersComponent,
          EvaluationComponent,
    
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    NgApexchartsModule, // Importez NgApexchartsModule avant NgxChartsModule
    WebsocketModule,
    PdfViewerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CanvasJSAngularChartsModule,
    MatCardModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
