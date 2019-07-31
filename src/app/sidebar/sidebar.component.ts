import { Component, OnInit } from '@angular/core';
import { MessageToast } from 'app/shared/messageToast/messageToast.component';
import { Router } from '@angular/router';
import { AuthenticationService } from "../service/authentication.service";
import { ConfirmDialogService } from 'app/shared/confirm-dialog/confirm-dialog.service';
import { CONSTANT } from 'app/shared/constant';
declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'apps', title: 'แอพพลิเคชัน',  icon: 'ti-view-grid', class: '' },
    { path: 'devices', title: 'อุปกรณ์',  icon: 'ti-layout-media-center-alt', class: '' },
    { path: 'reports', title: 'รายงาน',  icon: 'ti-view-list-alt', class: '' },
    { path: 'logout', title: 'ออกจากระบบ',  icon: 'ti-share-alt', class: '' },
    // { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    // { path: 'user', title: 'User Profile',  icon:'ti-user', class: '' },
    // { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
    // { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor(
        private router: Router,
        private MessageToast: MessageToast,
        private AuthenticationService :  AuthenticationService,
        private confirmDialogService: ConfirmDialogService,) {
    
      }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    logout(){

        this.confirmDialogService.confirmThis(CONSTANT.CONFIRM_LOGOUT, () => {
            //alert("Yes clicked");  
            this.AuthenticationService.logout();
          }, () => {
            //alert("No clicked");  
          })

    }


    classActive(menuItem) {
        let classActive : string = "active";
        return menuItem.path + classActive

    }

}
