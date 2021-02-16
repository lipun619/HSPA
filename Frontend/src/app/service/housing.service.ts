import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/Iproperty.interface';
import { Observable } from 'rxjs';
import { CompileStylesheetMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent: number) {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<IProperty> = [];
        let dataArray: any = [];
        dataArray = data;
        for (const id in dataArray) {
          if (data.hasOwnProperty(id) && dataArray[id].SellRent === SellRent) {
            propertiesArray.push(dataArray[id]);
          }
        }
        return propertiesArray;
      })
    );
  }
}
