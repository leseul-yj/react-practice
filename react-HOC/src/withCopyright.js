import React,{Component} from 'react'

const WithCopyRight = (OptionComponent) => {
  return class WithCopyright extends Component {
    render() {
      return (
        <div>
          <OptionComponent {...this.props}></OptionComponent>
          <div>&copy; 2019 &emsp;晶晶超级好看</div>
        </div>
      )
    }
  }
}

export default WithCopyRight