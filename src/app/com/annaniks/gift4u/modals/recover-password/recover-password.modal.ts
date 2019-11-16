import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../views/main/main.service';
import { MatDialogRef } from '@angular/material';
import { TranslateService1 } from '../../services';

@Component({
    selector: 'recover-password-modal',
    templateUrl: 'recover-password.modal.html',
    styleUrls: ['recover-password.modal.scss']
})
export class RecoverPasswordModal implements OnInit {
    private _recoverPassForm: FormGroup;
    private _isSended: boolean = false;

    constructor(private _dialogRef: MatDialogRef<RecoverPasswordModal>, private _fb: FormBuilder, private _mainService: MainService,
        private _translateService:TranslateService1) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this._recoverPassForm = this._fb.group({
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)]]
        })
    }

    private _recoverPassword(): void {
        this._mainService.recoverPassword(this._recoverPassForm.get('email').value).subscribe((data) => {
            this._isSended = true;
            this._recoverPassForm.disable();
        })
    }

    public onClickContinue(): void {
        if (this._recoverPassForm.valid) {
            this._recoverPassword();
        }
    }

    public onClickOk(): void {
        this._dialogRef.close();
    }

    get recoverPassForm(): FormGroup {
        return this._recoverPassForm;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
    get isSended(): boolean {
        return this._isSended;
    }
}