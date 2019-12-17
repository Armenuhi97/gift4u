import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShippingAddressesServices } from "./shipping-addresses.service";
import { Addresses, ServerResponse } from "../../../../models/models";
import { MatDialog } from "@angular/material";
import { AddAddressModal } from "../../../../modals/add-address/add-address.modal";
import { LoadingService } from "../../../../services/loading.service";
import { AppService, TranslateService1 } from "../../../../services";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'shipping-address-view',
    templateUrl: 'shipping-addresses.view.html',
    styleUrls: ['shipping-addresses.view.scss']
})
export class ShippingAddressesView implements OnInit {
    public addresses: Addresses[];
    constructor(private _addressesService: ShippingAddressesServices,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private _appService: AppService,
        private _loadingService: LoadingService,
        private _title: Title,
        private _translateService:TranslateService1,
        private _translate:TranslateService) {
        this._title.setTitle(this.translateWord(this._activatedRoute.data['_value'].title));
    }
    ngOnInit() {
        this._getAddresses()
    
    }
    public translateWord(key: string):string {
        return this._translate.instant(key)
    }
    private _getAddresses(): void {
        this._loadingService.showLoading()
        this._addressesService.getAddresses().subscribe((data: ServerResponse<Addresses[]>) => {
            this.addresses = data.messages;
            this._setParams();
            this._loadingService.hideLoading()
        },
            () => {
                this._loadingService.hideLoading()
            })
    }
    private _setParams(): void {
        for (let address of this.addresses) {
            address['showOrHide'] = true;
            address['icon'] = 'remove';
        }
    }
    public delete(address: Addresses): void {
        this._loadingService.showLoading()
        this._addressesService.deleteAddress(address.id).subscribe((data) => {
            this._getAddresses();
           // this._loadingService.hideLoading()
        },
            () => {
                this._loadingService.hideLoading()
            })
    }
    public addAddress(): void {
        let dialog = this._matDialog.open(AddAddressModal, {
            width: '679px',
            minHeight: '433px',
            maxHeight: '83vh'
        })
        dialog.afterClosed().subscribe((result) => {
            if (result) {
                this._getAddresses()
            }
        })
    }
    public edit(address: Addresses): void {
        let dialog = this._matDialog.open(AddAddressModal, {
            width: '679px',
            minHeight: '433px',
            maxHeight: '83vh',
            data: address
        })
        dialog.afterClosed().subscribe((result) => {
            if (result) {
                this._getAddresses()
            }
        })
    }
    public selectMainAddress(address: Addresses): void {
        this._loadingService.showLoading()
        this._addressesService.changeAddresses(address.name, address.fullName, address.phone,
            address.index, address.address, address.cityCountryId, true, address.id).subscribe((data) => {
                this._getAddresses()
            },
                () => {
                    this._loadingService.hideLoading()
                })
    }
    public showHide(address: Addresses): void {
        address.showOrHide = !address.showOrHide;
        address.icon = address.showOrHide ? 'remove' : 'add'
    }
}