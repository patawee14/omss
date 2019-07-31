
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'app/shared/confirm-dialog/confirm-dialog.service';
import { MessageToast } from 'app/shared/messageToast/messageToast.component';
import { Observable, Subject } from 'rxjs';
import { AppsModel } from './apps.model';
import { AppsService } from './apps.service';
import { CONSTANT } from '../shared/constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


//import { LocalDataSource } from 'ng2-smart-table';



declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}



@Component({
  selector: 'apps-cmp',
  moduleId: module.id,
  templateUrl: 'apps.component.html'
})

export class AppsComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;
  public mode: number = 0;
  public statusCode: string = "";
  public model = new AppsModel();
  //public listApps: LocalDataSource;
  public listAppsTemp: any[] = [];
  public statusList: any[] = [];
  public typeList: any[] = [];
  public settings: {};

  //public dtOptions: {};
  //dtOptions: DataTables.Settings = {};
  public isReady: boolean = false;
  dtTrigger = new Subject();

  rows: any[] = [];
  columns: any[] = [];

  public imageSrc: string = '';

  constructor(private AppsService: AppsService,
    private MessageToast: MessageToast,
    private confirmDialogService: ConfirmDialogService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.model.img = "assets/img/esslogo.png";
  }

  ngOnInit() {
    this.isReady = false;

    // console.log('this.dtOptions',this.dtOptions);
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };



    this.spinner.show();
    // this.settings = {
    //   columns: {
    //     appId: {
    //       title: 'ลำดับ'
    //     },
    //     appName: {
    //       title: 'ชื่อ Application'
    //     },
    //     version: {
    //       title: 'เวอร์ชัน'
    //     },
    //     typeName: {
    //       title: 'ประเภท'
    //     },
    //     statusName: {
    //       title: 'สถานะ'
    //     }
    //   }
    // };


    this.columns = [{
      name: 'ชื่อ Application',
      field: "appName"
    }, {
      name: 'เวอร์ชัน',
      field: "version"
    }, {
      name: 'ประเภท',
      field: "typeName"
    }, {
      name: 'สถานะ',
      field: "statusName"
    }

    ];



    // create the source

    this.getApps();
    this.statusList = [{ statusId: 1, statusName: "เปิดใช้บริการ" }, { statusId: 2, statusName: "ปิดการใช้งาน" }];
    this.typeList = [{ typeId: 1, typeName: "เจ้าหน้าที่" }, { typeId: 2, typeName: "บุคคลทั่วไป" }];

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getApps() {
    this.spinner.show();
    this.listAppsTemp = [];
    this.AppsService.getApp()
      .subscribe(res => {
        console.log('data', res);
        if (res.code == '1') {
          //this.listAppsTemp = Object.assign({},res.data);
          this.listAppsTemp = res.data;
          this.spinner.hide();
          //this.listApps = Object.assign({}, new LocalDataSource(res.data));
          //this.listApps = new LocalDataSource(res.data);
        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage('เกิดข้อผิดพลาด');
        }

      },
        errorCode => {
          console.log('errorCode', errorCode);
          this.spinner.hide();
          this.MessageToast.showErrorMessage('เกิดข้อผิดพลาด');
          //this.statusCode = errorCode;

          // if (errorCode == 401) {
          //   this.router.navigate(['/login']);
          //   //this.MessageToast.showMessage('เกิดข้อผิดพลาด');
          // } 
          return Observable.throw(errorCode);
        });

  }

  onAdd() {

    this.mode = 1;
    this.model = new AppsModel();
    this.model.img = "assets/img/esslogo.png";

  }

  onEdit(item) {
    this.model = new AppsModel;
    this.spinner.show();
    this.mode = 2;
    console.log('item', item);

    // this.model = item;
    // this.spinner.hide();

    this.AppsService.getAppDetail(item.appId)
      .subscribe(res => {
        console.log('data', res)
        if (res.code == 1) {
          this.model = res.data[0];
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
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          return Observable.throw(errorCode);
        });

  }


  onDelete(item) {

    console.log('item', item);
    this.confirmDialogService.confirmThis(CONSTANT.CONFIRM_DELETE, () => {
      //alert("Yes clicked");  
      this.callbackDelete(item);
    }, () => {
      //alert("No clicked");  
    })

  }

  callbackDelete = (item) => {

    console.log('item', item)
    this.spinner.show();
    this.AppsService.deleteApp(item.appId)
      .subscribe(res => {
        console.log('data', res)
        if (res.status == 200) {
          this.spinner.hide();
          this.getApps();
          this.mode = 0;
          this.MessageToast.showMessageSuccess(CONSTANT.DELETE_SUCCESS);
        } else {
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          //this.MessageToast.showMessage('เกิดข้อผิดพลาด');
        }
      },
        errorCode => {
          this.spinner.hide();
          console.log('errorCode', errorCode);
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          //this.statusCode = errorCode;
          return Observable.throw(errorCode);
        });


    //his.listAppsTemp.splice(index,1);
  }

  onSave() {
    console.log('modelSave', this.model);
    this.spinner.show();

    if (this.mode == 1) {
      this.createApp(this.model);
    } else {
      this.updateApp(this.model);
    }
  }


  createApp(model) {
    this.AppsService.createApp(model)
      .subscribe(res => {
        console.log('data', res)
        this.spinner.hide();
        if (res.status == 200) {
          //this.listAppsTemp = Object.assign({},res.data);
          this.MessageToast.showMessageSuccess(CONSTANT.SAVE_SUCCESS);
          this.mode = 0;
          this.getApps();
          //this.listApps = Object.assign({}, new LocalDataSource(res.data));
          //this.listApps = new LocalDataSource(res.data);
        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          //this.MessageToast.showMessage('เกิดข้อผิดพลาด');
        }

      },
        errorCode => {
          this.spinner.hide();
          console.log('errorCode', errorCode);
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          //this.statusCode = errorCode;
          return Observable.throw(errorCode);
        });
  }
  updateApp(model) {
    this.AppsService.updateApp(model)
      .subscribe(res => {
        console.log('data', res)
        this.spinner.hide();
        if (res.status == 200) {
          //this.listAppsTemp = Object.assign({},res.data);
          this.MessageToast.showMessageSuccess(CONSTANT.SAVE_SUCCESS);
          this.mode = 0;
          this.getApps();
        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          //this.MessageToast.showMessage('เกิดข้อผิดพลาด');
        }

      },
        errorCode => {
          this.spinner.hide();
          console.log('errorCode', errorCode);
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
          //this.statusCode = errorCode;
          return Observable.throw(errorCode);
        });
  }

  onCancel() {
    this.mode = 0;
  }


  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.MessageToast.showErrorMessage(CONSTANT.INVALID_FORMAT);
      //alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    console.log(reader.result)
    this.model.img = reader.result;
  }
}
