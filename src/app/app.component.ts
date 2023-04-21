import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myWeather: any;
  temperature = 0;
  min = 0;
  max = 0;
  humidity = 0;
  wind = 0;
  city = 'Baku';
  units = 'imperial';
  srchCity = this.city;
  error: any;
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.getWeatherData(this.city);
  }

  private getWeatherData(city: string) {
    this.weatherService.getWeatherData(this.city, this.units).subscribe({
      next: (response) => {
        this.myWeather = response;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.min = this.myWeather.main.temp_min;
        this.max = this.myWeather.main.temp_max;
        this.humidity = this.myWeather.main.humidity;
        this.wind = this.myWeather.wind.speed;
      },

      error: (error) => (this.srchCity = error.statusText),

      complete: () => console.info('API call completed'),
    });
  }
  getCityName(event: Event) {
    this.city = (<HTMLInputElement>event.target).value;
  }
  search() {
    this.getWeatherData(this.city);
    this.srchCity = this.city;
  }
}
