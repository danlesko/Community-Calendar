# Community-Calendar
Cisco coding challenge to create a simple calendar with CRUD operations. 

The page is live [here](http://ec2-52-54-85-216.compute-1.amazonaws.com:8080/CalendarApp/)

The overall goal was to create a calendar that displayed all days for the current month, and then have a way to add, update, and delete events for a given day of the month. In addition to that, no events were to overlap, and if an attempt was made to create an overlapping event, an error is to be shown. 

I decided to create this project using the technologies that I am most familiar with currently, Angular 2 and Spring Boot. While most of my experience tends more towards the front end, I created a simple rest API using Spring Boot / Hibernate that allowed events on the calendar to persist. The backend hooks up to a MySQL database for all storage of events. 

I used a number of existing libraries as well to complete the application. Primarily, the application is focused around the extenstion of the library, Angular Calendar. This is a fairly robust calendar library, extending the functionality of Full Calendar to Angular 2. Styling was primary done with a variant of Bootstrap called Bootswatch Paper. I also pulled in the ng2-bootstrap library as well to make certain elements of Bootstrap easier to use in Angular 2. Lastly, some helper functions from Lodash were pulled in to make a couple functions easier to complete.

Once the application was completed, I created a war file and uploaded it to a Tomcat Server hosted on my personal Amazon EC2 instance. 

### References / Libraries Used
- [Angular Calendar](https://mattlewis92.github.io/angular-calendar/#/kitchen-sink)
- [Bootswatch](https://bootswatch.com/)
- [ng2-bootstrap](http://valor-software.com/ngx-bootstrap/#/)
- [Lodash](https://lodash.com/)
