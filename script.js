import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
var count = 0;
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      eventtype: "Session",
      sessiontime: 1500,
      breaktime: 300,
      control: "pause" };

    this.time = this.time.bind(this);
    this.breakChange = this.breakChange.bind(this);
    this.sessionChange = this.sessionChange.bind(this);
    this.reset = this.reset.bind(this);
    this.timer = this.timer.bind(this);
    this.break = this.break.bind(this);
  }
  time() {
    var count = this.state.eventtype === "Session" ? this.state.sessiontime : this.state.breaktime;
    var minutes = Math.floor(count / 60);
    var seconds = count - minutes * 60;
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return minutes + ":" + seconds;
  }
  breakChange(event) {
    if (event.target.value === "breakInc") {
      if (this.state.break < 60) {
        this.setState({
          break: this.state.break + 1,
          breaktime: (this.state.break + 1) * 60 });

      }
    }
    if (event.target.value === "breakDec") {
      if (this.state.break > 1) {
        this.setState({
          break: this.state.break - 1,
          breaktime: (this.state.break - 1) * 60 });

      }
    }
  }
  sessionChange(event) {
    if (event.target.value === "sessionInc") {
      if (this.state.session < 60) {
        this.setState({
          session: this.state.session + 1,
          sessiontime: (this.state.session + 1) * 60 });

      }
    }
    if (event.target.value === "sessionDec") {
      if (this.state.session > 1) {
        this.setState({
          session: this.state.session - 1,
          sessiontime: (this.state.session - 1) * 60 });

      }
    }
  }
  reset() {
    this.setState({
      break: 5,
      session: 25,
      eventtype: "Session",
      sessiontime: 1500,
      breaktime: 300,
      control: "pause" });

    document.getElementById('beep').load();
  }
  break() {
    this.state.control = this.state.control === "play" ? "pause" : "play";
    const interval = setInterval(() => {
      if (this.state.control !== "play") {
        clearInterval(interval);
      } else
      {
        if (this.state.breaktime > 0) {
          this.setState({
            breaktime: this.state.breaktime - 1 });

        } else
        {
          clearInterval(interval);
          document.getElementById('beep').play();
          this.setState({
            eventtype: "Session",
            control: "pause",
            sessiontime: this.state.session * 60 });

          this.timer();
        }

      }}, 1000);
  }
  timer() {
    this.state.control = this.state.control === "play" ? "pause" : "play";
    const interval = setInterval(() => {
      if (this.state.control !== "play") {
        clearInterval(interval);
      } else
      {
        if (this.state.sessiontime > 0) {
          this.setState({
            sessiontime: this.state.sessiontime - 1 });

        } else
        {
          clearInterval(interval);
          document.getElementById('beep').play();
          this.setState({
            eventtype: "Break",
            control: "pause",
            breaktime: this.state.break * 60 });

          this.break();
        }}
    }, 1000);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "box" }, /*#__PURE__*/
      React.createElement("div", { id: "set" }, /*#__PURE__*/
      React.createElement("div", { id: "break" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, " Break Length "), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.breakChange, value: "breakInc" }, " in "), /*#__PURE__*/
      React.createElement("div", { id: "break-length" }, this.state.break), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.breakChange, value: "breakDec" }, " dec ")), /*#__PURE__*/

      React.createElement("div", { id: "session" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label" }, " Session Length "), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.sessionChange, value: "sessionInc" }, " in "), /*#__PURE__*/
      React.createElement("div", { id: "session-length" }, this.state.session), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.sessionChange, value: "sessionDec" }, " dec "))), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("div", { id: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.eventtype), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.time()), /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.timer }, " controls "), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.reset }, " reset "), /*#__PURE__*/
      React.createElement("audio", { id: "beep", src: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg", type: "audio/ogg" }))));



  }}

ReactDOM.render( /*#__PURE__*/React.createElement(Timer, null), document.getElementById('app'));