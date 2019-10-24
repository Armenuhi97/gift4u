import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MainService } from "../../views/main/main.service";
import { CityCountry, Addresses } from "../../models/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ShippingAddressesServices } from "../../views/main/personal-area/shipping-addresses/shipping-addresses.service";
import { LoadingService } from "../../services/loading.service";
import { TranslateService } from "../../services";

@Component({
    selector: 'add-address-modal',
    templateUrl: 'add-address.modal.html',
    styleUrls: ['add-address.modal.scss']
})
export class AddAddressModal {
    public buttonText: string;
    public addressForm: FormGroup;
    public cities: CityCountry[];
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: Addresses,
        private _dialogRef: MatDialogRef<AddAddressModal>,
        private _mainService: MainService,
        private _addressService: ShippingAddressesServices,
        private _fb: FormBuilder,
        private _loadingService: LoadingService,
        private _translateService: TranslateService
    ) { }
    ngOnInit() {
        this.buttonText = this._data ? this.translateWords('Save', 'Сохранить', 'Պահպանել') : this.translateWords('Add', 'Добавить', 'Ավելացնել')
        this._formBuilder();
        this._getCities();
    }
    public closeModal(): void {
        this._dialogRef.close()
    }
    private _formBuilder(): void {
        this.addressForm = this._fb.group({
            name: [null, Validators.required],
            fullName: [null, Validators.required],
            phone: [null, [Validators.required, Validators.minLength(8)]],
            city: [null, Validators.required],
            index: [null, Validators.required],
            address: [null, Validators.required]
        })
    }
    public getAttributeName(name: string) {
        return this._translateService.getRequestTranslateAttribute(name)
    }
    public translateWords(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _setValue(): void {
        this.addressForm.get('name').setValue(this._data.name);
        this.addressForm.get('fullName').setValue(this._data.fullName)
        this.addressForm.get('phone').setValue(this._data.phone);
        this.addressForm.get('index').setValue(this._data.index);
        this.addressForm.get('address').setValue(this._data.address);
        let selectCity = this.cities.filter((data) => {
            return data.id == this._data.cityCountryId
        })[0]
        this.addressForm.get('city').setValue(selectCity);
    }
    private _getCities(): void {
        this._mainService.getCities().subscribe((data) => {
            this.cities = data.messages;
            if (this._data) {
                this._setValue()
            }
        })
    }
    public add(): void {
        this._loadingService.showLoading()
        if (this._data) {
            this._addressService.changeAddresses(this.addressForm.value.name, this.addressForm.value.fullName,
                this.addressForm.value.phone, this.addressForm.value.index, this.addressForm.value.address,
                this.addressForm.value.city.id, false, this._data.id).subscribe((data) => {
                    this._loadingService.hideLoading()
                    this._dialogRef.close(true)
                },
                    () => {
                        this._loadingService.hideLoading()
                    })
        } else {
            this._addressService.addAddresses(this.addressForm.value.name, this.addressForm.value.fullName, this.addressForm.value.phone,
                this.addressForm.value.index, this.addressForm.value.address, this.addressForm.value.city.id).subscribe((data) => {
                    this._loadingService.hideLoading()
                    this._dialogRef.close(true)
                },
                    () => {
                        this._loadingService.hideLoading()
                    })
        }
    }
}