import React, { Component } from 'react'
import WidthCopyRight from './withCopyright' 
import Another from './Another'
 class App extends Component {
  render() {
    return (
      <div>
        App
        <Another name="another one"/>
      </div>
    )
  }
}
export default App