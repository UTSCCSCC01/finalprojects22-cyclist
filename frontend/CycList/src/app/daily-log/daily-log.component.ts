import { Component, OnInit, Injectable } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { GlobalsService } from '../globals.service';
import {Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})


@Injectable()
export class DailyLogComponent implements OnInit {

  weather: any;

  constructor(public globals: GlobalsService, private http: HttpClient) {}

  async ngOnInit() {
    this.globals.getNDailyTasks();
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
    let lat = parseInt(position.coords.latitude);
    let lon = parseInt(position.coords.longitude);

    this.loadCurrentWeather(lat, lon).subscribe(data => {

      let weatherConvert = []

      for (let i = 4; i <= 36; i+=8) {
        let weatherData = data["list"][i];

        if (weatherData['weather'][0]['icon'].includes("n.")) {
          weatherData['weather'][0]['icon'] = weatherData['weather'][0]['icon'].replace("n.", "d.");
        }

        weatherConvert.push(weatherData);
      }
      this.weather = weatherConvert;
    });
  }


  loadCurrentWeather(lat: any, lon: any): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91553bf4033d4aef2a4d46a66f38cb01`);
  }
}
