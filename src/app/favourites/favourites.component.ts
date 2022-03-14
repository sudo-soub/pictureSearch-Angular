import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  images: any;
  apiUrl = environment.apiUrl;
  show: boolean;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // get list of images in favourites
    this.http.get(this.apiUrl + 'api/v1/getAllFavourites').subscribe((data) => {
      this.show = true;
      this.images = data;
    })
  }

}
