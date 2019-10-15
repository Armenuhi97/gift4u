import { Injectable } from "@angular/core";
import { ApiService } from "../../../../services";

@Injectable()
export class ShippingAddressesServices {
    constructor(private _apiService: ApiService) { }
    public getAddresses() {
        return this._apiService.get('/address',true)
    }
    /**
     * 
     * @param name 
     * @param fullName 
     * @param phone 
     * @param index 
     * @param address 
     * @param countryId 
     */
    public addAddresses(name: string, fullName: string, phone: string, index: string, address: string, countryId: number) {
        return this._apiService.post('/address', {
            "name": name,
            "fullName": fullName,
            "phone": phone,
            "index": index,
            "address": address,
            "cityCountryId": countryId
        },true)
    }
    public changeAddresses(name: string, fullName: string, phone: string, index: string, address: string, countryId: number,status:boolean,id:number) {
        return this._apiService.put('/address', {
            "name" : name,
            "fullName" : fullName,
            "phone" : phone,
            "index" : index,
            "address" : address,
            "cityCountryId" : countryId,
            "status" : status,
            "id" :id
        },true)
    }
    /**
     * 
     * @param id 
     */
    public deleteAddress(id:number){
        return this._apiService.delete(`/address/${id}`,true)
    }
}