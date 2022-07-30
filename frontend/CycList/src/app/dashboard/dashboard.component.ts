import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';
import {Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  weather: any;

  constructor(public globals: GlobalsService, private http: HttpClient) {}

  async ngOnInit() {
    await this.globals.getDashboardTasks();
    this.globals.curLog = "daily";

    this.getWeatherForLocation();
  }

  getWeatherForLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), console.log, {enableHighAccuracy: false,timeout: 5000});
    } else {
      console.log("Could not get location");
    }
  }

  showPosition(position: any) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    this.loadCurrentWeather(lat, lon).subscribe(data => {
      console.log(data)
      this.weather = data;
      this.weather['main']['temp'] = Math.floor(this.weather['main']['temp'] - 273)
      this.weather['main']['feels_like'] = Math.floor(this.weather['main']['feels_like'] - 273)
    });
  }


  loadCurrentWeather(lat: any, lon: any): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=91553bf4033d4aef2a4d46a66f38cb01`);
  }

  compRatesAvailable(){
    return this.globals.completionRates[2] !== -1.0;
  }
}
