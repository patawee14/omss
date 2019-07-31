import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule } from '@ngui/map';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { MessageToast } from './shared/messageToast/messageToast.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

// import { DataTablesModule } from 'angular-datatables';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//import { Ng2SmartTableModule } from 'ng2-smart-table';

/**
 * Component
 */
import { LoginComponent } from './login/login.component';

import { AppsComponent } from './apps/apps.component';
import { DevicesComponent } from './devices/devices.component';
import { ReportsComponent } from './reports/reports.component';


/**
 * Service
 */
import { AuthenticationService } from './service/authentication.service';
import { LoginService } from './login/login.service';
import { AppsService } from './apps/apps.service';
import { DevicesService } from './devices/devices.service';
import { ReportsService } from './reports/reports.service';
import { ConfirmDialogService } from './shared/confirm-dialog/confirm-dialog.service'
import { NgxSpinnerService } from 'ngx-spinner';
/**
 * NEW
 */
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    
    HomeComponent,
    LoginComponent,
    AppsComponent,
    DevicesComponent,
    ReportsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' }),
    JWBootstrapSwitchModule,
    //Ng2SmartTableModule
    //DataTablesModule,
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  providers: [MessageToast, AuthenticationService, LoginService, AppsService, DevicesService, ReportsService, ConfirmDialogService, NgxSpinnerService],
  bootstrap: [AppComponent]
})

export class AppModule { }
