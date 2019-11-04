import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../controls/controls';
import { MainService } from '../../views/main/main.service';
import { TranslateService } from '../../services';

@Component({
    selector: 'app-change-password',
    templateUrl: 'change-password.component.html',
    styleUrls: ['change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    private _changePasswordForm: FormGroup;
    private _error: string;
    private _isCompleted: boolean = false;
    private _loading: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private _mainService: MainService,
        private _translateService:TranslateService
    ) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {

        this._changePasswordForm = this._fb.group({
            oldPassword: [null, Validators.required],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required]
        },
            {
                validator: PasswordValidation.MatchPassword
            })
    }

    private _changePassword(): void {
        this._loading = true;
        this._mainService.changePassword(
            this._changePasswordForm.get('password').value,
            this._changePasswordForm.get('oldPassword').value).subscribe((data) => {
                this._isCompleted = true;
                this._loading = false;
            },
                (error) => {
                    this._loading = false;
                    this._isCompleted = false;
                    this._error = error.error.message;
                })
    }

    public onClickChange(): void {
        if (this._changePasswordForm.valid) {
            this._changePassword();
        }
    }

    get changePasswordForm(): FormGroup {
        return this._changePasswordForm;
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    get error(): string {
        return this._error;
    }

    get loading(): boolean {
        return this._loading;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
    ngOnDestroy() { }
}