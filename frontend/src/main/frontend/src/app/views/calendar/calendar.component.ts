import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import { EventFetchService } from '../../global/event-fetch.service';
import * as _ from "lodash";

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {Subject} from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter
} from 'angular-calendar';

import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';

import { NewCalendarEvent } from './calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [EventFetchService,
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  constructor(private eventFetchService: EventFetchService) {

  }

  ngOnInit() {
    this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
    //console.log(subDays(startOfDay(new Date()), 1));
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();
  month: any = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[];
  activeDayIsOpen: boolean = false;

  modalData: {
    action: string,
    event: CalendarEvent
  };

  testEvents: CalendarEvent[];
  newTitle: any;
  startTime: any = new Date();
  endTime: any = new Date();
  startDate: any = new Date();
  endDate: any = new Date();
  newEvent: NewCalendarEvent = new NewCalendarEvent();
  tempEvent: CalendarEvent;
  editing: boolean = false;

  setEdit(): void{
    this.editing = !this.editing;
  }

  fetchEvents(month: number, year: number): void{
    this.eventFetchService
      .fetchEvents(month, year)
      .subscribe(response => {
        this.events = response;

        for(let event of this.events){
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          event.color = colors.blue;
        }

        //console.log(this.events);
        //console.log(this.testEvents);
        //console.log()
      });
  }

  createEvent(): void{

    //console.log("Start Date" + this.startDate);
    //console.log("Start Time" + this.startTime);
    let theStartMonth: number = this.startDate.getMonth() + 1;
    let theEndMonth: number = this.endDate.getMonth() + 1;

    let start: string = this.startDate.getFullYear() + "-" + theStartMonth + "-" + this.startDate.getDate() + " " +
        this.startTime.getHours() + ":" + this.startTime.getMinutes() + ":" + "00";

    let end: string = this.endDate.getFullYear() + "-" + theEndMonth + "-" + this.endDate.getDate() + " " +
      this.endTime.getHours() + ":" + this.endTime.getMinutes() + ":" + "00";

    let checkStart = new Date(start);
    let checkEnd = new Date(end);
    let addIt = true;

    if (checkEnd.getTime() < checkStart.getTime()){
      alert("You must select a start time that occurs before an end time!");
      return;
    }

    //check to see if event overlaps
    for(let event of this.events){
      if ((checkStart.getTime() <= event.end.getTime() && checkStart.getTime() >= event.start.getTime())){
        addIt = false;
      }
      if ((checkEnd.getTime() <= event.end.getTime() && checkEnd.getTime() >= event.start.getTime())){
        addIt = false;
      }
      if (event.start.getTime() >= checkStart.getTime() && event.end.getTime() <= checkEnd.getTime()){
        addIt = false;
      }
    }

    if (addIt == true) {
      this.newEvent.start = start;
      this.newEvent.end = end;
      this.newEvent.title = this.newTitle;

      //console.log(this.newEvent);

      this.eventFetchService
        .createEvent(this.newEvent)
        .subscribe(response => {
          //console.log(response);
          this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
          alert("Event Added successfully!");
        });

    } else {
      alert("There is already an event in that time frame!");
    }
  }

  updateEvent(eventID: number): void{
    //console.log("Start Date" + this.startDate);
    //console.log("Start Time" + this.startTime);

    let theStartMonth: number = this.modalData.event.start.getMonth() + 1;
    let theEndMonth: number = this.modalData.event.end.getMonth() + 1;

    let start: string = this.modalData.event.start.getFullYear() + "-" + theStartMonth + "-" + this.modalData.event.start.getDate() + " " +
      this.modalData.event.start.getHours() + ":" + this.modalData.event.start.getMinutes() + ":" + "00";

    let end: string = this.modalData.event.end.getFullYear() + "-" + theEndMonth + "-" + this.modalData.event.end.getDate() + " " +
      this.modalData.event.end.getHours() + ":" + this.modalData.event.end.getMinutes() + ":" + "00";

    let checkStart = new Date(start);
    let checkEnd = new Date(end);
    let addIt = true;

    //console.log("check start: " + checkStart);
    //console.log("")

    if (checkEnd.getTime() < checkStart.getTime()){
      alert("You must select a start time that occurs before an end time!");
      return;
    }

    //let tempEvents = JSON.parse(JSON.stringify(this.events));

    //check to see if event overlaps
    for(let event of this.events){

      if ((checkStart.getTime() <= event.end.getTime() && checkStart.getTime() >= event.start.getTime())) {
        addIt = false;
      }
      if ((checkEnd.getTime() <= event.end.getTime() && checkEnd.getTime() >= event.start.getTime())) {
        addIt = false;
      }
      if (event.start.getTime() >= checkStart.getTime() && event.end.getTime() <= checkEnd.getTime()){
        addIt = false;
      }
    }

    if (addIt == true) {
      this.newEvent.start = start;
      this.newEvent.end = end;
      this.newEvent.title = this.modalData.event.title;

      //console.log(this.newEvent);

      this.eventFetchService
        .updateEvent(this.newEvent, eventID)
        .subscribe(response => {
          //console.log(response);
          this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
          alert("Event Updated successfully!");
        });

      //this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
      //alert("Event Added successfully!");


    } else {
      /*this.newEvent.start = start;
      this.newEvent.end = end;
      this.newEvent.title = this.modalData.event.title;

      console.log(this.newEvent);*/

      this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
      alert("There is already an event in that time frame!");
    }
  }

  deleteEvent(eventID: number){
    this.eventFetchService
      .deleteEvent(eventID)
      .subscribe(() => {
        alert("The event has been deleted!");
        this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
      });

  }

  dateChange(val: any): void{
    //console.log(val);
    this.activeDayIsOpen = false;
    this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
  }

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.tempEvent = Object.assign({}, event);

    //console.log("Before: ");
    //console.log(this.events);
    this.events = _.reject(this.events, event);

    //console.log("Before: ");
    //console.log(this.events);

    /*console.log("Modal Event: ");
    console.log(this.modalData.event);*/
    //this.modal.open(this.modalContent, {size: 'lg'});
  }

  addBack(): void{
    this.fetchEvents(this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
  }

}


