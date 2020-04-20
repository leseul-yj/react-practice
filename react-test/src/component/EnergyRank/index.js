import React,{Component} from 'react'
import PropTypes from 'prop-types';
import EnergyItem from './EnergyItem'

export default class EnergyRank extends Component {
  static propTypes = {
    rank: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      freq: PropTypes.number.isRequired
    })).isRequired,
    onCompletedChange: PropTypes.func
  }
  // //设置默认属性
  // static defaultProps = {
  //   desc: "能源排名"
  // }
  render() {
    
    return (<div>{
      // this.props.rank.map(item => {
      //   return <EnergyItem id={item.id} 
      //   key={item.id} 
      //   name={item.name} 
      //   freq={item.freq} 
      //   date={item.date}>
      //   </EnergyItem>
      // })
      this.props.rank.map(item => {
        return <EnergyItem
          onCompletedChange={this.props.onCompletedChange}
          key={item.id}
          {...item} />
      })
    }
    </div>
    )
  }
}
