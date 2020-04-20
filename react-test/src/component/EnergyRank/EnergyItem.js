import React,{Component} from 'react'
import classNames from 'classnames';
import './index.css'
const noop = () => {};
export default class EnergyItem extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }
  static getDerivedStateFromProps() {
    return {}
  }
  componentDidMount() {

  }
  shouldComponentUpdate(nextProps,nextState) {
    return nextProps.isActive !== this.props.isActive
  }
  handleCheckboxChange() {
    // 第一种方式 如果函数不存在
    // this.props.onCompletedChange && this.props.onCompletedChange(this.props.id)
    // 第二种 noop空函数
    const {
      onCompletedChange = noop,
      id
    } = this.props;
    onCompletedChange && onCompletedChange(id)

  }
  render() {
    console.log("renderName"+this.props.name)
    return (
      <div className={classNames('itemStyle')}>
        <div>
          <input
            checked={this.props.isActive}
            onChange={this.handleCheckboxChange}
            type="checkbox" />
        </div>
        <div>{this.props.name}</div>
        <div>{this.props.date}</div>
        <div>{this.props.freq}</div>
      </div>
    )
  }
}
