import React,{Component,Fragment} from 'react'
import {EnergyChart,EnergyRank,AddEnergy,TaskModal} from './component';
import moment from 'moment';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Chiller',
      rank: [{
        id: 111,
        name: "热舒适",
        date: "2020-01-13",
        freq: 111,
        isActive: false
      },{
        id: 112,
        name: "能耗浪费",
        date: "2020-01-13",
        freq: 111,
        isActive: false
      },{
        id: 113,
        name: "设备健康",
        date: "2020-01-13",
        freq: 111,
        isActive: false
      }]
    }
  }
  addEnergy = (item) => {
    //第一种方法 rank要用新数组
    // this.setState({
    //   rank: this.state.rank.concat({
    //     id: Math.random(),
    //     name: item,
    //     date: moment().format("YYYY-MM-DD HH:mm:ss"),
    //     freq: 111
    //   })
    // })
    const newRank = [...this.state.rank];
    newRank.push({
      id: Math.random(),
      name: item,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      freq: 111,
      isActive: false
    });
    this.setState({
      rank: newRank
    })
  }
  onCompletedChange = (id) => {
    this.setState((prevState) => {
      return {
        rank: prevState.rank.map((item) => {
          if(item.id === id) {
            item.isActive = !item.isActive;
          }
          return item
        })
      }
    })
  }
  render() {
    return (
      <Fragment>
        <AddEnergy
          title="添加"
          addEnergyfunc={this.addEnergy}>
        </AddEnergy>
        <EnergyRank
          rank={this.state.rank}
          onCompletedChange={this.onCompletedChange}
        />
        <EnergyChart
          desc="能源管理详情"
          date={11}>
          <p>{this.state.title}</p>
          <div>Chart</div>
        </EnergyChart>
        <TaskModal />
      </Fragment>
      // <>
      //   <EnergyChart />
      //   <EnergyRank />
      // </>
    )
  }
}
