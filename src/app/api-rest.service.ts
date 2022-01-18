import {Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApiRestService {
    public url = 'http://localhost:9000';

    constructor(private http: HttpClient) { }

  saveToken = (token: any) => {
      return this.http.post(`${this.url}/save`, token);
  };
}

/*
export class RestService {
  constructor(private http: HttpClient) { }

  public guardarEnviar(data: any): any {
    return this.http.post(`http://localhost:9000/api/guardar`, {
      data: data
    })
  }
}*/
