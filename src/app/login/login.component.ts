import { OnInit, Component } from "@angular/core";
import { LoginModel } from "./login.model";
import { AuthenticationService } from "../service/authentication.service";
import { LoginService } from "./login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { MessageToast } from 'app/shared/messageToast/messageToast.component';
import { CONSTANT } from "app/shared/constant";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AppsService } from 'app/apps/apps.service';

@Component({
  selector: 'login-cmp',
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(public router: Router,
    public LoginService: LoginService,
    public MessageToast: MessageToast,
    public spinner: NgxSpinnerService,
    public AuthenticationService: AuthenticationService,
    public AppsService: AppsService, ) {

  }
  public model = new LoginModel;
  ngOnInit() {
  }



  login() {
    debugger
    this.spinner.show();
    //this.router.navigate(['/home/apps']);
    // this.AuthenticationService.login(this.model.username, this.model.password)
    //   .subscribe(
    //     data => {
    //       this.createReportMobile(this.model);
    //       // this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
    //     });
    this.LoginService.getTokenWebUser(this.model)
      .subscribe(res => {
        console.log('res', res)
        if (res.status == 1 || res.code == 1) {
          //this.spinner.hide();
          console.log('res', res);
          this.model.token = res.data.token;
          this.createReportMobile(this.model);

          // localStorage.setItem('token', res.data.token);
          // localStorage.setItem('username', this.model.username.toLowerCase());
          // this.router.navigate(['/home/apps']);
        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
        }

      },
        errorCode => {
          this.spinner.hide();
          return Observable.throw(errorCode);
        });

  }




  clear() {
    this.model = new LoginModel;
  }


  createReportMobile(model: LoginModel) {
    model.platform = "web";
    this.LoginService.createReportMobile(model)
      .subscribe(res => {
        console.log('res', res)
        if (res.status == 200) {
          this.spinner.hide();
          //debugger
          localStorage.setItem('token', model.token);
          localStorage.setItem('username', this.model.username.toLowerCase());
          this.router.navigate(['/home/apps']);

        } else {
          this.spinner.hide();
          this.MessageToast.showErrorMessage(CONSTANT.SYSTEM_ERROR);
        }

      },
        errorCode => {
          this.spinner.hide();
          return Observable.throw(errorCode);
        });
  }


}