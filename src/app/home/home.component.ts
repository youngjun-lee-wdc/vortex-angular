import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({ 
    templateUrl: 'home.component.html', 
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
    public loading = false;
    public user: User;
    public userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        // this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
        //     this.loading = false;
        //     this.userFromApi = user;
        // });
    }
}