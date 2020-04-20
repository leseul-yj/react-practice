import React, { Component } from 'react'
import WithCopyRight from './withCopyright';

@WithCopyRight
 class Another extends Component {
  render() {
    return (
      <div>
        Another {this.props.name}
      </div>
    )
  }
}

// export default WithCopyRight(Another)

//装饰器写法
export default Another