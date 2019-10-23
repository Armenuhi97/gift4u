import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MainService } from '../../views/main/main.service';

@Component({
    selector: 'back-call-modal',
    templateUrl: 'back-call.modal.html',
    styleUrls: ['back-call.modal.scss']
})
export class BackCallModal implements OnInit {
    private _backCallForm: FormGroup;
    private _errorMessage: string = undefined;
    private _loading: boolean = false;
    constructor(private _fb: FormBuilder, private _dialogRef: MatDialogRef<BackCallModal>, private _mainService: MainService) { }
    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this._backCallForm = this._fb.group({
            name: [null, Validators.required],
            phone: [null, [Validators.required, Validators.minLength(10)]]
        })
    }

    private _backCall(): void {
        this._loading = true;
        this._mainService.backCall({
            name: this._backCallForm.get('name').value,
            phone: '+374' + this._backCallForm.get('phone').value
        }).subscribe((data) => {
            this._loading = false;
            this._errorMessage = undefined;
            this._dialogRef.close();
        },
            (error) => {
                this._errorMessage = 'Ошибка';
                this._loading = false;
            })
    }

    public closeModal(): void {
        this._dialogRef.close();
    }

    public onClickSend(): void {
        if (this._backCallForm.valid && !this._loading) {
            this._backCall();
        }
    }

    get backCallForm(): FormGroup {
        return this._backCallForm;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    get loading(): boolean {
        return this._loading;
    }
}