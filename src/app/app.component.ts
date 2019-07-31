import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from './shared/confirm-dialog/confirm-dialog.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public isLogin: boolean = false;

  constructor(
    private router: Router,
    private confirmDialogService: ConfirmDialogService, ) {

  }

  ngOnInit() {

  }


}
