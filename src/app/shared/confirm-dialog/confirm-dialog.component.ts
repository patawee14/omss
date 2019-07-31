import { Component, Input } from '@angular/core';
import { ConfirmDialogService } from "./confirm-dialog.service";
import { CONSTANT } from '../constant';
@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
    message: any;
    btnOk: string = ""
    btnCancel: string = ""
    constructor(
        private confirmDialogService: ConfirmDialogService
    ) {
        this.btnOk = CONSTANT.CONFIRM_OK;
        this.btnCancel = CONSTANT.CONFIRM_CANCEL;
    }

    //  btnOk: string = CONSTANT.CONFIRM_OK;
    //  btnCancel : string = CONSTANT.CONFIRM_CANCEL;

    ngOnInit() {
        //this function waits for a message from alert service, it gets   
        //triggered when we call this from any other component  
        this.confirmDialogService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
} 