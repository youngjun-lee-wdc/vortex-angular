import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'login.component.html',   styleUrls: ['./login.component.css'],   })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    rememberMe = false;
    token = ""

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.userValue) { 
            this.router.navigate(['/']);
        }
        const loggedIn = localStorage.getItem("loggedIn")
        if (loggedIn){
            this.rememberMe = JSON.parse(loggedIn)
            this.token = localStorage.getItem("token")!
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        if (this.rememberMe){
            this.loginForm = this.formBuilder.group({
                username: ['test51', Validators.required],
                password: ['test', Validators.required],
            });
            this.authenticationService.tokenAuthenticate(this.token)
        }
        console.log(this.token)
    }

    public rememberMeChecked = () => {
        this.rememberMe = !this.rememberMe
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) return

        localStorage.setItem("loggedIn", JSON.stringify(this.rememberMe) )
        

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                    window.location.reload()
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }

    register(){
        this.router.navigate(['/register']);
    }
}
