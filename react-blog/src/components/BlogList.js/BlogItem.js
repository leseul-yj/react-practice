import React, { Component } from 'react'

export default class BlogItem extends Component {
  render() {
    const {title, body} = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    )
  }
}
