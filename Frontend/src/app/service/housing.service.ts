import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Property } from '../model/properties';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertyArray => {
        // throw new Error('some error');
        return propertyArray.find(p => p.Id === id)
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        let dataArray: any = [];
        dataArray = data;

        const localProperties = JSON.parse(localStorage.getItem('newProp')!);

        if (localProperties) {
          for (const lp in localProperties) {
            if (SellRent) {
              if (localProperties.hasOwnProperty(lp) && localProperties[lp].SellRent === SellRent) {
                propertiesArray.push(localProperties[lp]);
              }
            } else {
              propertiesArray.push(localProperties[lp]);
            }
          }
        }

        for (const id in dataArray) {
          if(SellRent) {
            if (data.hasOwnProperty(id) && dataArray[id].SellRent === SellRent) {
              propertiesArray.push(dataArray[id]);
            }
          } else {
            propertiesArray.push(dataArray[id]);
          }
        }
        return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  //Add new property in array if newProp already exists in local storage
  addProperty(property: Property) {
    let newProp = [];
    if(localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp')!)];
    } else {
      newProp = [property]
    }
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
