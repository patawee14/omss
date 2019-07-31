import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'app/shared/confirm-dialog/confirm-dialog.service';
import { MessageToast } from 'app/shared/messageToast/messageToast.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { CONSTANT } from '../shared/constant';
import { DevicesModel } from './devices.model';
import { DevicesService } from './devices.service';
import { Router } from '@angular/router';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'devices-cmp',
  moduleId: module.id,
  templateUrl: 'devices.component.html'
})

export class DevicesComponent implements OnInit {

  onText = "เปิด"
  offText = "ปิด"

  public model = new DevicesModel();

  public tableData1: TableData;
  public tableData2: TableData;
  public mode: number = 0;

  public WELCOME: string = CONSTANT.WELCOME;
  public listDevices: any[] = [];

  public dtOptions: {};
  dtTrigger = new Subject();

  constructor(private DevicesService: DevicesService,
    private MessageToast: MessageToast,
    private confirmDialogService: ConfirmDialogService,
    private spinner: NgxSpinnerService,
    private router: Router) {

  }

  ngOnInit() {
    this.spinner.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };


    this.getDevice();

    // this.tableData1 = {
    //   headerRow: ['ลำดับ', 'หมายเลข UUID', 'รุ่น', 'โมเดล', 'จัดการ'],
    //   dataRows: [
    //     ['1', 'AAAA-BBBB-CCCC-DDDD', 'A-Phone', 'A-123'],
    //     ['2', 'ZZZZ-YYYY-XXXX-WWWW', 'JumJung', 'J-456'],
    //   ]
    // };
    // this.tableData2 = {
    //   headerRow: ['ID', 'Name', 'Salary', 'Country', 'City'],
    //   dataRows: [
    //     ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
    //     ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
    //     ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
    //     ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
    //     ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten',],
    //     ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester']
    //   ]
    // };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  getDevice() {
    this.spinner.show();
    this.listDevices = [];
    this.DevicesService.getDevice()
      .subscribe(res => {
        if (res.code == 1) {
          console.log('dataDevice', res)
          this.listDevices = res.data;
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
        }

      },
        errorCode => {
          this.spinner.hide();
          //this.statusCode = errorCode;

          // if (errorCode == 401) {
          //   this.router.navigate(['login']);
          // }
          console.log('errorCode', errorCode);
          return Observable.throw(errorCode);
        });

  }

  onAdd() {
    this.mode = 1;
  }

  onEdit(item: DevicesModel) {
    this.spinner.show();
    this.mode = 1;
    console.log('item', item);
    //this.mappingData(item);
    this.model = new DevicesModel();

    //item.permission = [{ deviceId: 1, appId: 1, permissionID: 1, appName: "ESS-mobile Applicaton", createDate: new Date(), updateDate: new Date(), permissionStatusID: false }, { deviceId: 2, appId: 2, permissionID: 2, appName: "TEST", permissionStatusID: true, createDate: new Date(), updateDate: new Date() }];
    //this.model = item;
    //this.spinner.hide();


    this.DevicesService.getDeviceDetail(item.deviceId)
      .subscribe(res => {
        console.log('res', res)
        if (res.code == '1') {
          //this.model = Object.assign({}, res.data[0]);
          this.model = res.data[0];


          //this.model.permission = [{appId:1,appName:"ESS-mobile Applicaton",permissionStatusID:true},{appId:2,appName:"TEST",permissionStatusID:true}];

          this.spinner.hide();
          //this.mappingData(res.data)

        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
        }

      },
        errorCode => {
          this.spinner.hide();
          console.log('errorCode', errorCode);
          return Observable.throw(errorCode);
        });
  }

  mappingData(item) {
    this.model = new DevicesModel();
    let tmpmodelArr = Object.keys(this.model);
    item.forEach((currentValue, index) => {
      tmpmodelArr.forEach((key, i) => {
        if (i == index) {
          this.model[key] = currentValue;
        }
      });
    });
    console.log('this.model', this.model);
  }
  onDelete(item) {
    console.log('item', item);
    this.confirmDialogService.confirmThis(CONSTANT.CONFIRM_DELETE, () => {
      this.callbackDelete(item);
    }, function () {
    })
  }

  callbackDelete = (item) => {

    console.log('item', item)
    this.spinner.show();
    this.DevicesService.deleteDevice(item.deviceId)
      .subscribe(res => {
        console.log('data', res)
        if (res.status == 200) {
          this.spinner.hide();
          this.getDevice();
          this.mode = 0;
          this.MessageToast.showMessageSuccess(CONSTANT.DELETE_SUCCESS);
        } else {
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
        }

      },
        errorCode => {
          this.spinner.hide();
          console.log('errorCode', errorCode);
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          return Observable.throw(errorCode);
        });


    //his.listAppsTemp.splice(index,1);
  }

  onSave() {
    console.log('this.model', this.model);
    this.updateDevice(this.model);

  }
  updateDevice(model: DevicesModel) {
    //model.permission = model.permission.filter(x => x.permissionStatusID == true);
    this.spinner.show();
    this.DevicesService.updateDevice(model)
      .subscribe(res => {
        console.log('data', res)
        this.spinner.hide();
        if (res.status == 200) {
          this.MessageToast.showMessageSuccess(CONSTANT.SAVE_SUCCESS);
          this.mode = 0;
          this.getDevice();
        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
        }

      },
        errorCode => {
          console.log('errorCode', errorCode);
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          return Observable.throw(errorCode);
        });
  }

  onCancel() {
    this.mode = 0;
  }
}
