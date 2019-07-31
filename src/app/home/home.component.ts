import { Router } from '@angular/router';
import { OnInit, Component } from "@angular/core";


@Component({
  selector: 'home-cmp',
  moduleId: module.id,
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public isHome: boolean = false;
  constructor(private router: Router, ) {

  }
  ngOnInit() {

    console.log('this.router.url', this.router.url);
  }
}