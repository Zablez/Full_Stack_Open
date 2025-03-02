import React from 'react'

const Notification = (props) => {
  const { type, text } = props

  return <>{text && <div className={`notification ${type}`}>{text}</div>}</>
}

export default Notification
