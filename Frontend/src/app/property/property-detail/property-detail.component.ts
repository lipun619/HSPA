import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { HousingService } from 'src/app/service/housing.service';
import { Property } from '../../model/properties';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
})
export class PropertyDetailComponent implements OnInit {
  // public propertyId: number = 0;
  property = new Property();
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    // this.propertyId = +this.route.snapshot.params['id'];

    this.route.data.subscribe(
      (data: any) => {
        this.property = data['prp'];
      }
    )

    // this.route.params.subscribe((params) => {
    //   this.propertyId = +params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(
    //     (data: any) => {
    //       this.property = data;
    //     }, error => this.router.navigate(['/']));
    // });

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/interior-1.jpg',
        medium: 'assets/images/interior-1.jpg',
        big: 'assets/images/interior-1.jpg'
      },
      {
        small: 'assets/images/interior-2.jpg',
        medium: 'assets/images/interior-2.jpg',
        big: 'assets/images/interior-2.jpg'
      },
      {
        small: 'assets/images/interior-3.jpg',
        medium: 'assets/images/interior-3.jpg',
        big: 'assets/images/interior-3.jpg'
      },
      {
        small: 'assets/images/interior-4.jpg',
        medium: 'assets/images/interior-4.jpg',
        big: 'assets/images/interior-4.jpg'
      },
      {
        small: 'assets/images/interior-5.jpg',
        medium: 'assets/images/interior-5.jpg',
        big: 'assets/images/interior-5.jpg'
      },
      {
        small: 'assets/images/interior-6.jpg',
        medium: 'assets/images/interior-6.jpg',
        big: 'assets/images/interior-6.jpg'
      },
      {
        small: 'assets/images/interior-7.jpg',
        medium: 'assets/images/interior-7.jpg',
        big: 'assets/images/interior-7.jpg'
      }
    ];
  }
}
