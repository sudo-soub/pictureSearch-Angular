import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userid: any;
  username: any;
  image: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get list of images in favourites
    this.userid = localStorage.getItem('userid');
    this.username = localStorage.getItem("username");
    if(this.userid && this.username) {
      this.http.get(this.apiUrl + 'api/v1/getAllFavourites', {params: {'userid': this.userid}}).subscribe((data) => {
        this.show = true;
        this.images = data;
      });
    }
    else {
      this.router.navigateByUrl("/login");
    }
    
  }

  fetchimage(image) {
    this.image = image;
  }

  deleteimage() {
    this.http.get(this.apiUrl + 'api/v1/removeimage', {params: {'userid': this.userid, 'url': this.image}}).subscribe((data) => {
      this.images = data;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

}
