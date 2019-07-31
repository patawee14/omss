import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MessageToast } from 'app/shared/messageToast/messageToast.component';
import { ReportsModel } from './reports.model';
import { ReportsService } from './reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { format } from 'url';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}


@Component({
    selector: 'reports-cmp',
    moduleId: module.id,
    templateUrl: 'reports.component.html'
})

export class ReportsComponent implements OnInit {
    public tableData1: TableData;
    public dtOptions: {};
    dtTrigger = new Subject();
    public textSearch: string = "";
    public listReport: ReportsModel[] = [];
    public tmplistReport: ReportsModel[] = [];
    public blob = new Blob;
    public url;
    constructor(private ReportService: ReportsService,
        private MessageToast: MessageToast,
        private spinner: NgxSpinnerService) {

    }

    ngOnInit() {

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
        };

        this.getReportData();

        // this.listReport = [{ uuid: "AAAA-BBBB-CCCC-DDDD", appName: "ESS-Mobile Application", createDate: new Date(),deviceId:1,brand:"aa",updateDate : new Date(),model:"aa" },
        // { uuid: "FFFF-GGGG-HHHH-IIII", appName: "One stop mobile survey", createDate: new Date(),deviceId:1,brand:"aa",updateDate : new Date(),model:"bb" }
        // ];

        // this.tmplistReport = [{ uuid: "AAAA-BBBB-CCCC-DDDD", appName: "ESS-Mobile Application", createDate: new Date(),deviceId:1,brand:"aa",updateDate : new Date(),model:"aa" },
        // { uuid: "FFFF-GGGG-HHHH-IIII", appName: "One stop mobile survey", createDate: new Date(),deviceId:1,brand:"aa",updateDate : new Date(),model:"bb" }
        // ];



    }

    getReportData() {
        this.spinner.show();
        this.ReportService.getReport()
            .subscribe(res => {
                this.listReport = [];
                console.log('dataReport', res)
                if (res.data) {
                    this.listReport = res.data;
                    this.listReport.forEach((item) => {
                        item.createDateText = this.formatDate(new Date(item.createDate));
                    });
                }


                this.tmplistReport = res.data;
                this.spinner.hide();
            },
                errorCode => {
                    this.spinner.hide();
                    console.log('errorCode', errorCode);
                    //this.statusCode = errorCode;
                    return Observable.throw(errorCode);
                });

    }

    formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;// + ' ' + ampm;
        return day + "/" + month + "/" + year + "  " + strTime;
    }

    exportLogReport() {
        this.spinner.show();
        this.ReportService.exportLogReport()
            .subscribe(res => {
                console.log('dataReport', res)
                this.blob = new Blob([res._body]);
                // const file = new File([this.blob], 'reportLog.xls', { type: 'application/vnd.ms-excel' });
                // console.log(this.blob);
                // console.log(file);
                // this.url = window.URL.createObjectURL(file);
                // window.open(this.url);


                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(this.blob);
                link.download = "ReportData.xlsx";
                link.click();


                this.spinner.hide();
            },
                errorCode => {
                    this.spinner.hide();
                    console.log('errorCode', errorCode);
                    return Observable.throw(errorCode);
                });
    }

    filterItems(arr, query) {
        return arr.filter((item) => {
            return ((item.appName.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
                (item.uuid.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
                (item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1)

            );
        })
    }

    searchData(txt) {
        this.listReport = this.filterItems(this.tmplistReport, txt);
    }
}
