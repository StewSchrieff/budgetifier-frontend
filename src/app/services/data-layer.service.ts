import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  url = 'http://127.0.0.1:5000/getData';
  postUrl = 'http://127.0.0.1:5000/save';
  isSaved = false;

  constructor(private http: HttpClient) { 
  }

  getData() {
    return this.http.get(this.url);
  }

  saveData(data: any) {
    this.http.post(this.postUrl, data).subscribe(res => {
      this.isSaved = true;
    });
  }
}
