package cisco.interview.Events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * Created by Dan Lesko on 4/29/2017.
 */
@Service
public class EventsService {

    @Autowired
    private EventsDao eventsDao;

    @Transactional
    public List<Events> getEvents(Integer month, Integer year) {
        return eventsDao.getEvents(month, year);
    }

    @Transactional
    public List<Events> createEvent(Events event){
        return eventsDao.createEvent(event);
    }

    @Transactional
    public List<Events> updateEvent(Events event, Integer eventID){
        return eventsDao.updateEvent(event, eventID);
    }

    @Transactional
    public void deleteEvent(Integer eventID){
        eventsDao.deleteEvent(eventID);
    }
}
