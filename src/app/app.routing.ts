import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import { AppsComponent } from './apps/apps.component';
import { DevicesComponent } from './devices/devices.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        children : [
            {
                path: 'apps',
                component: AppsComponent
            },
            {
                path: 'devices',
                component: DevicesComponent
            },
            {
                path: 'reports',
                component: ReportsComponent
            },
        ]
    },
    // {
    //     path: 'apps',
    //     component: AppsComponent
    // },
    // {
    //     path: 'devices',
    //     component: DevicesComponent
    // },
    // {
    //     path: 'reports',
    //     component: ReportsComponent
    // },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    }
]
