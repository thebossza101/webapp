import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class HttpserviceService {

  constructor(public http: Http) { }


post(url: string, data) {
   return new Promise((resolve, reject) => {
            const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        const body = new URLSearchParams();
        Object.keys(data).forEach(key => {
          body.set(key, data[key]);
        });
        this.http.post(url, body.toString(), { headers: headers }).map(res => res.json()).subscribe(data => {
            resolve(data);
          }, (er) => {
            reject('er - > postdata');
          });


   });

}
}
