import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

    public checkPropertyValue(object: object | Array<any>, element: string | number, returnValue = null) {
        return (object != null && object[element]) ? object[element] : returnValue;
    }

    public filterArray(array: Array<object>, key: string, element: string | number): object {
        return (array) ? array.filter((el) => el[key] === element) : null;
    }
}