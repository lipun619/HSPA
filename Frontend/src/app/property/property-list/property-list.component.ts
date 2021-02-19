import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ipropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/service/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: ipropertyBase[] = [];
  SellRent = 1;
  constructor(
    private housingService: HousingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      (data) => {
        this.properties = data;
        const newProperty = JSON.parse(localStorage.getItem('newProp')!);

        if(newProperty.SellRent === this.SellRent) {
            this.properties = [newProperty, ...this.properties]
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
