import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

const OnlineIndexContainer = (props) => {
  const [channel, setChannel] = useState(0)
  const [redirect, setRedirect] = useState(false)

  const handleChange = event => {
    setChannel(event.currentTarget.value)
  }

  const submitHandler = event => {
    event.preventDefault()
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={`/online/${channel}`} />
  }

  return(
    <div className="grid-x grid-padding-x" id="new-form">
      <div className="cell">
        <form className="callout" onSubmit={submitHandler}>
          <label htmlFor="channel">
            Please input a channel number
            <input
              type="number"
              name="channel"
              id="channel"
              value={channel}
              onChange={handleChange}
              />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default OnlineIndexContainer
