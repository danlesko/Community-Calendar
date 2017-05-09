package cisco.interview.Events;

import java.util.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Repository;

import com.javaetmoi.core.persistence.hibernate.JpaLazyLoadingUtil;
/**
 * Created by Dan Lesko on 4/29/2017.
 */
@Repository
public class EventsDao {

    private EntityManager entityManager;

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Events> getEvents(Integer month, Integer year) {

        List<Events> events;

        events = entityManager.createNativeQuery(
                "SELECT * FROM events WHERE MONTH(start) = " + month + " AND YEAR(start) = " + year + " ORDER BY start", Events.class).getResultList();


        events.removeIf(Objects::isNull);

        return events;


    }

    public List<Events> createEvent(Events event){
        Query query = entityManager.createNativeQuery("INSERT INTO events (start, end, title) VALUES (\'"  + event.getStart() + "\', \'" + event.getEnd() +"\', \'"
        + event.getTitle() + "\')");

        query.executeUpdate();


        List<Events> newEvent = entityManager.createNativeQuery("SELECT * FROM events WHERE start = \'"  + event.getStart() + "\'" +
        " AND end = \'" + event.getEnd() + "\' AND title = \'" + event.getTitle() + "\'").getResultList();

        return newEvent;
    }

    public List<Events> updateEvent(Events event, Integer eventID){
        Query query = entityManager.createNativeQuery("UPDATE events SET title = \'" + event.getTitle() + "\', start = \'" +
                event.getStart() + "\', end = \'" + event.getEnd() + "\' WHERE eventID = " + eventID);


        query.executeUpdate();


        List<Events> newEvent = entityManager.createNativeQuery("SELECT * FROM events WHERE start = \'"  + event.getStart() + "\'" +
                " AND end = \'" + event.getEnd() + "\' AND title = \'" + event.getTitle() + "\'").getResultList();

        return newEvent;
    }

    public void deleteEvent(Integer eventID){
        Query query = entityManager.createNativeQuery("DELETE FROM events WHERE eventID = " + eventID);
        query.executeUpdate();
    }

}
