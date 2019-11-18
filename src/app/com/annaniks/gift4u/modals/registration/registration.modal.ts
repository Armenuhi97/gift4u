import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { LoginService, AppService, TranslateService1 } from '../../services';
import { MainService } from '../../views/main/main.service';
import { CityCountry, ServerResponse, LoginResponse } from '../../models/models';
// import { CookieService } from 'angular2-cookie';

import { PasswordValidation } from '../../controls/controls';
import { CookieService } from '../../services/cookie.service';
import { PlatformService } from '../../services/platform.service';

@Component({
    selector: 'registration-modal',
    templateUrl: 'registration.modal.html',
    styleUrls: ['registration.modal.scss']
})
export class RegistrationModal implements OnInit {
    private _registrationForm: FormGroup;
    private _cities: CityCountry[];
    private _error: string;

    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<RegistrationModal>,
        private _loginService: LoginService,
        private _mainService: MainService,
        private _appService: AppService,
        private _cookieService: CookieService,
        private _translateService: TranslateService1,
        private _platformService:PlatformService
    ) { }

    ngOnInit() {
        this._formBuilder();
        this._getCities();
    }
    public getTranslateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _formBuilder(): void {
        this._registrationForm = this._fb.group({
            name: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]],
            phone: [null, [Validators.required, Validators.minLength(8)]],
            city: [null, Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        })
    }

    private _registerUser(): void {
        this._loginService.registerUser({
            name: this._registrationForm.get('name').value,
            email: this._registrationForm.get('email').value,
            phone: '+374' + this._registrationForm.get('phone').value,
            cityCountryId: this._appService.checkPropertyValue(this._registrationForm.get('city').value, 'id'),
            password: this._registrationForm.get('password').value
        }).subscribe((data: LoginResponse) => {
            this._error = undefined;
            if (this._platformService.isBrowser)
                this._cookieService.set('accessToken', data.access_token);
            this._dialogRef.close(true);
        },
            (error) => {
                console.error(error);
                if (error) {
                    this._error = error.error.message[0];
                }

            }
        )
    }

    public getAttributeName(name: string) {
        return this._translateService.getRequestTranslateAttribute(name)
    }
    private _getCities(): void {
        this._mainService.getCities().subscribe((data: ServerResponse<CityCountry[]>) => {
            this._cities = data.messages;
        })
    }

    public onClickRegister(): void {
        if (this._registrationForm.valid) {
            this._registerUser();
        }
    }

    public closeModal(): void {
        this._dialogRef.close();
    }

    get registrationForm(): FormGroup {
        return this._registrationForm;
    }

    get cities(): CityCountry[] {
        return this._cities;
    }

    get error(): string {
        return this._error;
    }
    get language() {
        return this._translateService.getActiveLanguage()
    }
}