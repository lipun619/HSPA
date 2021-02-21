import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { promise } from 'protractor';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from 'src/app/model/properties';
import { HousingService } from 'src/app/service/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private housingService:HousingService, private router:Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const propID = route.params['id'];
    return this.housingService.getProperty(+propID).pipe(
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

}
