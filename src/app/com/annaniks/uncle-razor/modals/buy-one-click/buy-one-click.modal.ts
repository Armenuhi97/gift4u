import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'buy-one-click-modal',
    templateUrl: 'buy-one-click.modal.html',
    styleUrls: ['buy-one-click.modal.scss']
})
export class BuyOneClickModal implements OnInit {
    private _buyOneClickForm: FormGroup;

    constructor(private _fb: FormBuilder, private _dialogRef: MatDialogRef<BuyOneClickModal>) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this._buyOneClickForm = this._fb.group({
            name: [null, Validators.required],
            phone: [null, Validators.required]
        })
    }

    public closeModal(): void {
        this._dialogRef.close();
    }

    get buyOneClickForm(): FormGroup {
        return this._buyOneClickForm;
    }
}