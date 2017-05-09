package cisco.interview.Events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

/**
 * Created by Dan Lesko on 4/29/2017.
 */
@Controller
@RequestMapping("/events")
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping(path = "/{month}/{year}", produces = "application/json")
    @ResponseBody
    public List<Events> getEvents(@PathVariable Integer month, @PathVariable Integer year) {
        return eventsService.getEvents(month, year);
    }

    @PostMapping(path = "/", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Events> createEvent(@RequestBody Events event){
        List<Events> newEvent = eventsService.createEvent(event);
        if (newEvent != null) return new ResponseEntity<Events>(HttpStatus.OK);
        else return new ResponseEntity<Events>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = "/{eventID}", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Events> updateEvent(@RequestBody Events event, @PathVariable Integer eventID){
        List<Events> newEvent = eventsService.updateEvent(event, eventID);
        if (newEvent != null) return new ResponseEntity<Events>(HttpStatus.OK);
        else return new ResponseEntity<Events>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(path = "/{eventID}", produces = "application/json")
    @ResponseBody
    public void deleteEvent(@PathVariable Integer eventID){
        eventsService.deleteEvent(eventID);
    }
}

