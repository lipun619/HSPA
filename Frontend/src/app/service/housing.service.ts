import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ipropertyBase } from '../model/ipropertybase';
import { Property } from '../model/properties';
import { localizedString } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent: number) {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<ipropertyBase> = [];
        let dataArray: any = [];
        dataArray = data;

        const localProperties = JSON.parse(localStorage.getItem('newProp')!);

        if (localProperties) {
          for (const lp in localProperties) {
            if (localProperties.hasOwnProperty(lp) && localProperties[lp].SellRent === SellRent) {
              propertiesArray.push(localProperties[lp]);
            }
          }
        }

        for (const id in dataArray) {
          if (data.hasOwnProperty(id) && dataArray[id].SellRent === SellRent) {
            propertiesArray.push(dataArray[id]);
          }
        }
        return propertiesArray;
      })
    );
  }

  //Add new property in array if newProp already exists in local storage
  addProperty(property: Property) {
    let newProp = [];
    newProp = [...JSON.parse(localStorage.getItem('newProp')!), property];
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID')! + 1));
      return +localStorage.getItem('PID')!;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
