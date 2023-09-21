import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { User, Role } from './_models';
import { Popover } from 'bootstrap';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vortex-angular';
  user: User;

  constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
      console.log("from app.component.ts", this.user)
      // console.log(this.user.username)
           
  }

  ngAfterContentChecked() {
    $('[data-bs-toggle="popover"]').popover({
      html: true,
      sanitize: false
    });
  }

  get isAdmin() {
      return this.user && this.user.role === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
  }
}
