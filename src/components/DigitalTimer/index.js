import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isStarted: false,
    timerVal: 25,
    secondsTime: 0,
    timeElapsedInSeconds: 0,
    timeElapsedInMinutes: 25,
    count: 0,
  }

  setStateValueOnTimerIncrease = () => {
    const {timerVal, count} = this.state

    const secondsCompleted = count === 60

    if (secondsCompleted) {
      this.setState({
        count: 0,
      })
    } else {
      this.setState(prevState => ({
        timerVal: count === 0 ? timerVal - 1 : timerVal,
        secondsTime: 59 - count,
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
        count: prevState.count + 1,
      }))
    }
  }

  increaseTimerElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timeElapsedInMinutes} = this.state

    const checkTimerCompleted =
      timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (checkTimerCompleted) {
      this.onCLickButton()
    } else {
      this.setStateValueOnTimerIncrease()
    }
  }

  onCLickButton = () => {
    const {timeElapsedInMinutes, isStarted, timeElapsedInSeconds} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isStarted) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.increaseTimerElapsedInSeconds, 980)
    }

    this.setState(prevState => ({
      isStarted: !prevState.isStarted,
    }))
  }

  onClickPlusButton = () => {
    const {isStarted} = this.state
    if (isStarted === false) {
      this.setState(prevState => ({
        timerVal: prevState.timerVal + 1,
        secondsTime: 0,
        timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
      }))
    }
  }

  onClickMinusButton = () => {
    const {isStarted, timerVal} = this.state
    if (isStarted === false && timerVal > 1) {
      this.setState(prevState => ({
        timerVal: prevState.timerVal - 1,
        secondsTime: 0,
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  onCLickRest = () => {
    clearInterval(this.intervalId)
    this.setState({
      timerVal: 25,
      timeElapsedInMinutes: 25,
      timeElapsedInSeconds: 0,
      secondsTime: 0,
      isStarted: false,
      count: 0,
    })
  }

  renderButtonContainer = () => {
    const {isStarted} = this.state

    const palyOrpauseButton = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const text = isStarted ? 'Pause' : 'Start'
    const imgAlt = isStarted ? 'pause icon' : 'play icon'
    const resetIcon =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

    return (
      <div className="start-reset-button-container">
        <button className="button1" type="button" onClick={this.onCLickButton}>
          <img alt={imgAlt} src={palyOrpauseButton} className="image1" />
          <p className="pause-play"> {text} </p>
        </button>

        <button onClick={this.onCLickRest} className="button1" type="button">
          <img alt="reset icon" src={resetIcon} className="image1" />
          <p className="pause-play"> Reset </p>
        </button>
      </div>
    )
  }

  renderSetTimerButton = () => {
    const {timeElapsedInMinutes} = this.state

    return (
      <div className="set-timer-contaoiner">
        <p className="set-timer-text"> Set Timer Limit </p>
        <div className="timer-button">
          <button
            onClick={this.onClickMinusButton}
            className="minus-button"
            type="button"
          >
            -
          </button>
          <p className="timer-limit-button" type="button">
            {timeElapsedInMinutes}
          </p>
          <button
            onClick={this.onClickPlusButton}
            className="minus-button"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getSeconds = () => {
    const {secondsTime} = this.state
    const strSeconds = secondsTime > 9 ? secondsTime : '0'.concat(secondsTime)

    return strSeconds
  }

  getMinutes = () => {
    const {timerVal} = this.state
    const strMinutes = timerVal > 9 ? timerVal : '0'.concat(timerVal)
    return strMinutes
  }

  render() {
    const {isStarted} = this.state
    const timerStatus = isStarted ? 'Running' : 'Paused'

    const minutes = this.getMinutes()
    const seconds = this.getSeconds()

    return (
      <div className="app-container">
        <h1> Digital Timer </h1>

        <div className="timer-button-container">
          <div className="inside-container">
            <div className="timer-container">
              <h1 className="timer">
                {minutes}:{seconds}
              </h1>
              <p className="timer-status"> {timerStatus} </p>
            </div>
          </div>
          {this.renderButtonContainer()}
          {this.renderSetTimerButton()}
        </div>
      </div>
    )
  }
}

export default DigitalTimer
