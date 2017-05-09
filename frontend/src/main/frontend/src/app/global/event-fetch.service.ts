import { Injectable } from '@angular/core';
import {Headers, Http, Response, RequestOptions}       from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import {NewCalendarEvent} from '../views/calendar/calendar';

@Injectable()
export class EventFetchService {

  constructor(private http: Http) { }

  private eventsURL = './events';

  fetchEvents(month: number, year: number): Observable<any>{
    let url = `${this.eventsURL}/${month}/${year}`;
    return this.http
      .get(url)
      .map(response=> response.json() as any);
  }

  createEvent(event: NewCalendarEvent): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url = `${this.eventsURL}/`;
    //console.log("Event:" + JSON.stringify(event));
    return this.http.post(url, JSON.stringify(event), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateEvent(event: NewCalendarEvent, eventID: number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const url = `${this.eventsURL}/${eventID}`;
    //console.log("Event:" + JSON.stringify(event));
    return this.http.put(url, JSON.stringify(event), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteEvent(eventID: number): Observable<any>{
    let headers = new Headers();
    const url = `${this.eventsURL}/${eventID}`;
    return this.http.delete(url, headers)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let resSize = res.text().length;
    //console.log(resSize);
    let body = {};
    if (resSize > 0) {
      body = res.json();
    }
    return body || {};
  }
  private handleError(error: Response | any) {
    console.log(error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
