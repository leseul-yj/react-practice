import React,{Component,createRef} from 'react'

export default class AddEnergy extends Component {
  constructor() {
    super();
    this.state = {
      inputVal: '设备健康'
    }
    this.inputDom = createRef();
    // 这样只用绑定一次
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this)
  }
  handleInputChange(e) {
    this.setState({
      inputVal: e.currentTarget.value
    });
  }
  handleAddClick() {
    if(this.state.inputVal === ''){
      return
    }
    this.props.addEnergyfunc(this.state.inputVal);
    this.setState({
      inputVal: ''
    },() => {
      this.inputDom.current.focus();
    })
  }
  handleKeyUp(e) {
    if(e.keyCode === 13) {
      this.handleAddClick(this.state.inputVal);
    }
  }
  render() {
    return (
      <div>
        <input type="text"
          value={this.state.inputVal}
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyUp}
          ref={this.inputDom}
        />
        <button onClick={this.handleAddClick}>{this.props.title}</button>
      </div>
    )
  }
}
