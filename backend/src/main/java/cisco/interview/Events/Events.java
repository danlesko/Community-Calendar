package cisco.interview.Events;

import java.io.Serializable;
import javax.persistence.*;

/**
 * Created by Dan Lesko on 4/9/2017.
 */
@Entity
@IdClass(Events.class)
@Table(name = "events")
public class Events implements Serializable {

    @Id
    @Column
    private Integer eventID;

    @Column
    private String start;

    @Column
    private String end;

    @Column
    private String title;

    public Integer getEventID() {
        return eventID;
    }

    public void setEventID(Integer eventID) {
        this.eventID = eventID;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


}
