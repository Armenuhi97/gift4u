import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '../../services';

@Component({
    selector: 'buy-one-click-modal',
    templateUrl: 'buy-one-click.modal.html',
    styleUrls: ['buy-one-click.modal.scss']
})
export class BuyOneClickModal implements OnInit {
    private _buyOneClickForm: FormGroup;

    constructor(private _fb: FormBuilder, private _dialogRef: MatDialogRef<BuyOneClickModal>,
        private _translateService:TranslateService) { }

    ngOnInit() {
        this._formBuilder();
    }

    private _formBuilder(): void {
        this._buyOneClickForm = this._fb.group({
            name: [null, Validators.required],
            phone: [null, Validators.required]
        })
    }
    public translateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    public closeModal(): void {
        this._dialogRef.close();
    }

    get buyOneClickForm(): FormGroup {
        return this._buyOneClickForm;
    }
}