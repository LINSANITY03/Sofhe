import React, { useCallback, useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar_new";
import "./Calender.scss";
import Navbar from "./Navbar_new";
import Calendermodule from "../../components/Calender_module";
import AddEvent from "../../components/AddEvent";
import Moment from "react-moment";
import AuthContext from "../../services/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDay,
  faClock,
  faCaretDown,
  faCaretUp,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

function Calender() {
  const [create, setCreate] = useState(false);
  let { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [currentevents, setCurrentEvents] = useState("");
  const [allevent, setAllEvents] = useState("");
  const [eventlist, setEvenList] = useState(true);

  // callback function to show/hide the +Create Model with the help of setstate
  const ShowCreateModel = useCallback(() => {
    setCreate(!create);
  }, [create]);

  // callback function to show/hide the +Create Model with the help of setstate
  const ShowEventDetailModel = useCallback(() => {
    setEvenList(!eventlist);
  }, [eventlist]);

  // callback function to show/hide the Events in a Date with the help of setstate
  const showAllEvent = useCallback(
    (props) => {
      setAllEvents(!allevent);
      setCurrentEvents(props);
      if (props) {
        setEvenList(true);
      }
    },
    [allevent]
  );

  // call the fetch function only once the page reloads
  useEffect(() => {
    getEvents();
  }, []);

  // fetch events of users and set it to the events state
  let getEvents = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/all-tasks/${user.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      setEvents(data);
    } else if (response.statusText === "Unauthorized") {
      alert("Unauthorized");
    }
    return response;
  };

  // html code -->
  return (
    <div className={"body__content"}>
      {create ? <div className="overlay"></div> : <></>}
      <div className={`${create ? "show__model" : "hide__model"}`}>
        {create ? (
          <AddEvent ShowCreateModel={ShowCreateModel} getEvents={getEvents} />
        ) : (
          ""
        )}
      </div>
      <Sidebar />
      <div className="right__hand">
        <Navbar />
        <div className="widget__container">
          <div
            className={`${
              eventlist && currentevents
                ? "show_events__contents"
                : "hide_events__contents"
            }`}
          >
            {/* <div className="show_events__contents"> */}
            <div className="top__bar">
              <div className="title__content">Events from {currentevents}</div>
              <div className="search__content">
                <input
                  type="search"
                  placeholder="Search..."
                  name="s"
                  className="search"
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <div className="close_top__bar">
                <FontAwesomeIcon
                  icon={faClose}
                  onClick={ShowEventDetailModel}
                  id="close__icon"
                />
              </div>
            </div>

            <div className="events__list">
              {events.map((event) => (
                <div
                  className={
                    event.date_only === currentevents
                      ? "indiviual__event"
                      : "hide__events"
                  }
                  key={event.id}
                >
                  <div className="description__contents">
                    <div className="title">{event.title}</div>
                    <div className="description">{event.description}</div>
                  </div>
                  <div className="date">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      size="2x"
                      id="event_icon"
                    />
                    <Moment format="YYYY-MM-DD">{event.task_datetime}</Moment>
                  </div>
                  <div className="time">
                    <FontAwesomeIcon icon={faClock} size="2x" id="event_icon" />
                    <Moment format="HH:mm A">{event.task_datetime}</Moment>
                  </div>
                  <div className="status">
                    <div className="income">$ {event.credit}</div>
                    <div className="status__icon">
                      {event.status == 0 ? (
                        <FontAwesomeIcon
                          icon={faCaretUp}
                          id="upward__icon"
                          size="2x"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          id="downward__icon"
                          size="2x"
                        />
                      )}
                    </div>
                  </div>
                  <div className="buttons__content">
                    <div className="edit__btn">
                      <button className="event__edit btns">Edit</button>
                    </div>
                    <div className="delete__btn">
                      <button className="event__delete btns">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="working__calender">
            <Calendermodule
              create={create}
              events={events}
              ShowCreateModel={ShowCreateModel}
              showAllEvent={showAllEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calender;
