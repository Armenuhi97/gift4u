import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from '../../views/main/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityCountry, ServerResponse } from '../../models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService, TranslateService1 } from '../../services';

@Component({
    selector: 'select-city-modal',
    templateUrl: 'select-city.modal.html',
    styleUrls: ['select-city.modal.scss']
})
export class SelectCityModal implements OnInit {
    private _selectCityForm: FormGroup;
    private _cities: CityCountry[] = [];
    private _loading: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _dialogRef: MatDialogRef<SelectCityModal>,
        private _mainService: MainService,
        private _fb: FormBuilder,
        private _appService: AppService,
        private _translateService:TranslateService1
    ) { }

    ngOnInit() {
        this._formBuilder();
        this._getCities();
    }

    private _formBuilder(): void {
        this._selectCityForm = this._fb.group({
            city: [null, Validators.required]
        })
    }
    public getTranslateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    getAttributeName(name){
        return this._translateService.getRequestTranslateAttribute(name)
    }

    private _getCities(): void {
        this._mainService.getCities().subscribe((data: ServerResponse<CityCountry[]>) => {
            this._cities = data.messages;
            this._setFormValues();
        })
    }

    public onClickSetSity(): void {
        if (this._selectCityForm.valid) {
            this._dialogRef.close({ city: this._selectCityForm.get('city').value });
        }
    }

    private _setFormValues(): void {
        let city: CityCountry = this._appService.checkPropertyValue(this._cities.filter((element) => element.name === this._data.cityname), 0);
        this._selectCityForm.patchValue({
            city: city
        })
    }

    get selectCityForm(): FormGroup {
        return this._selectCityForm;
    }

    get cities(): CityCountry[] {
        return this._cities;
    }

    get loading(): boolean {
        return this._loading;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}