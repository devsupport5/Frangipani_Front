import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/slider/sliders';

  constructor(private http: HttpClient) { }

  getSlider(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSlider(Slider: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Slider);
  }

  updateSlider(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateSliderStatus(id: number ,value: any) {    
    this.http.put(this.baseUrl+"/"+id, value).subscribe(data => {
      console.log(data);
    },
  error => {
    console.log('Log the error here: ', error);
    });    
  }

  deleteSlider(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSliderList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
