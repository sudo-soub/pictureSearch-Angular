import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cityValue: any = '';
  selectedName:any = '';
  locUrl = environment.locUrl;
  locUrl2 = environment.locUrl2;
  apiUrl = environment.apiUrl;
  geoUrl = environment.geoapifyUrl;
  lat: any;
  lon: any;
  cities: any = {};
  flickr: any;
  page: any;
  last: any;
  currentPlace: any;

  valueForm = new FormGroup({
    values: new FormControl('', [Validators.pattern("([A-Z][a-z]*)|([A-Z][a-z]*[\s][A-Z][a-z]*)|([+-]?[0-9]*.[0-9]*,[+-]?[0-9]{1,}.[0-9]*)")])
  });
  namePattern: any = /^([A-Z][a-z]*)$|^([A-Z][a-z]*[\s][A-Z][a-z]*)$/;
  numPattern: any = /([+-]?[0-9]*.[0-9]*,[+-]?[0-9]{1,}.[0-9]*)/;
  isFlickr: boolean;
  username: any;
  userid: any;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get the city names present in db
    
    if(localStorage.getItem('userid') != null){
      this.username = localStorage.getItem('username');
      this.userid = localStorage.getItem('userid');
      this.http.get(this.apiUrl + "api/v1/getCities").subscribe((data) => {
        this.cities = data;
      });
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  getValues(){
    if(this.valueForm.controls['values'].invalid){
      document.getElementById('nameInput').style.borderColor = 'red';
      window.alert('Invalid value!');
    }
    else{
      document.getElementById('nameInput').style.borderColor = '#ced4da';
      this.spinner.show();
      if(this.namePattern.test(this.cityValue)){  // if the input is city name
        this.http.get(this.locUrl + this.cityValue + this.locUrl2).subscribe((data) => {
          this.lat = data[0].lat;
          this.lon = data[0].lon;
          this.currentPlace = this.cityValue;
          let body = {
            city: this.cityValue,
            lat: this.lat,
            lon: this.lon
          };
  
          this.http.post(this.apiUrl + 'api/v1/cities',body).subscribe((data) =>{
            this.spinner.hide();
            this.page = data['page'];
            this.last = data['lastpage'];
            this.flickr = data;
            this.isFlickr = true;
          });
        });


      }
      if(this.numPattern.test(this.cityValue)){ // if the input is coordinates
        this.lat = this.cityValue.split(",")[0];
        this.lon = this.cityValue.split(",")[1];

        let params = {
          lat: this.lat,
          lon: this.lon,
          apiKey: '75e84923ee4c4f5cb52befc2d8dba545'
        };
        this.spinner.show();
        this.http.get(this.geoUrl, {params: params}).subscribe((data) => {
          this.currentPlace = data['features'][0]['properties']['city'];
          let body = {
            city: this.currentPlace,
            lat: this.lat,
            lon: this.lon
          };
          this.http.post(this.apiUrl + 'api/v1/cities',body).subscribe((data) =>{
            this.spinner.hide();
            this.page = data['page'];
            this.last = data['lastpage'];
            this.flickr = data;
            this.isFlickr = true;
          });
        });
        
      }
    }
  }

  getNamePhotos() {
    this.currentPlace = this.selectedName;
    let body = {
      'place': this.selectedName
    }
    this.spinner.show();
    this.http.post(this.apiUrl + "api/v1/presetCitiesData", body).subscribe((data) => {
      this.spinner.hide();
      this.page = data['page'];
      this.last = data['lastpage'];
      this.flickr = data;
      this.isFlickr = true;
    });
  }

  addtoFavourites(url) {
    let body = {
      'url': url,
      'userid': this.userid
    }
    this.http.post(this.apiUrl + 'api/v1/addtoFavourites',body).subscribe((data) => {
      if(data['present'] == 'true') {
        alert(data['message']);
      }
      else {
        alert(data['message']);
      }
    })
  }

  prevPage() {
    if(this.page == 1){
      alert("Already on first page!");
    }
    else{
      this.spinner.show();
      this.page--;
      let body = {
        'page': this.page,
        'place': this.currentPlace
      };
      this.http.post(this.apiUrl + "api/v1/prevPage", body).subscribe((data) => {
        this.spinner.hide();
        this.page = data['page'];
        this.flickr = data;
      });
    }
  }

  nextPage() {
    this.page++;
    let body = {
      'page': this.page,
      'place': this.currentPlace
    };
    this.spinner.show();
    this.http.post(this.apiUrl + "api/v1/nextPage", body).subscribe((data) => {
      this.spinner.hide();
      this.page = data['page'];
      this.flickr = data;
    });
  }

  firstpage() {
    if(this.page == 1){
      alert("Already on first page!");
    }
    else {
      let body = {
        'page': 1,
        'place': this.currentPlace
      }
      this.spinner.show();
      this.http.post(this.apiUrl + "api/v1/prevPage", body).subscribe((data)=> {
        this.spinner.hide();
        this.page = data['page'];
        this.flickr = data;
      });
    }
  }

  lastpage() {
    if(this.page == this.last){
      alert("Already on last page!");
    }
    else {
      let body = {
        'page': this.last,
        'place': this.currentPlace
      }
      this.spinner.show();
      this.http.post(this.apiUrl + "api/v1/prevPage", body).subscribe((data)=> {
        this.spinner.hide();
        this.page = data['page'];
        this.last = data['lastpage'];
        this.flickr = data;
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
