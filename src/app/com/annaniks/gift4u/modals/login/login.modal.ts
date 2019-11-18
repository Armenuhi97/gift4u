import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService, TranslateService1 } from '../../services';
// import { CookieService } from 'angular2-cookie';
import { LoginResponse } from '../../models/models';
import { MainService } from '../../views/main/main.service';
import { RecoverPasswordModal } from '../recover-password/recover-password.modal';
import { CookieService } from '../../services/cookie.service';
import { RegistrationModal } from '../registration/registration.modal';


@Component({
    selector: 'login-modal',
    templateUrl: 'login.modal.html',
    styleUrls: ['login.modal.scss']
})
export class LoginModal implements OnInit {
    private _loginForm: FormGroup;
    private _errorMessage: string;

    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<LoginModal>,
        private _loginService: LoginService,
        private _cookieService: CookieService,
        private _mainService: MainService,
        private _matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _translateService:TranslateService1
    ) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this._loginForm = this._fb.group({
            email: [null, [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]],
            password: [null, Validators.required],
            remember: [null]
        })
    }
    public openRegistrationModal(): void {
        let matDialog = this._matDialog.open(RegistrationModal, {
            width: '679px',
            minHeight: '433px',
            maxHeight: '80vh'
        })
        matDialog.afterClosed().subscribe((data) => {
            if (data) {
                this._mainService.getUser();
            }
        })

    }
    private _userLogin(): void {
        this._loginService.userLogin({ email: this._loginForm.get('email').value, password: this._loginForm.get('password').value }).subscribe(
            (data: LoginResponse) => {
                this._rememberMe(this._loginForm.get('remember').value, data.access_token);
                this._errorMessage = undefined;
                this._mainService.getUser().subscribe((data) => {
                    this.closeModal();
                });
            }, (error) => {
                if (error.status === 401 || error.status === 404) {
                    this._errorMessage =this._translateService.translateImportant('Incorrect login or password','Неправильный логин или пароль','Սխալ է մուտքագրված գաղտնանունը կամ գաղտնաբառը') 
                }
                if (error.status === 400) { }
            })
    }


    private _rememberMe(value: boolean, token: string) {
        const validity_days: number = 7;
        const expires: number = validity_days * 1000 * 60 * 60 * 24;
        let expires_date = null;

        if (value) {
            expires_date = new Date(new Date().getTime() + expires);
        }
        this._cookieService.set('accessToken', token, { expires: expires_date });
    }

    public onClickLogin(): void {
        if (this._loginForm.valid) {
            this._userLogin();
        }
    }

    public closeModal(): void {
        this._dialogRef.close();
    }

    public onClickRecoverPassowrd(): void {
        let dialogRef = this._matDialog.open(RecoverPasswordModal, {
            width: '350px',
        })
    }

    get loginForm(): FormGroup {
        return this._loginForm;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}