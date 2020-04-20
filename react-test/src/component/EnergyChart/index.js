import React,{Component, useState, useEffect} from 'react'
import PropTypes from 'prop-types';

export default function EnergyChart(props) {
  //useState 是一个数组
  console.log(useState())
  const [count,setCount] = useState(0);
  useEffect(() => {
    document.title = `当前数量${count}`;
  })
  return (
    <div>
      <button onClick={() => {setCount(count - 1)}}>-</button>
      <span>{count}</span>
      <button onClick={() => {setCount(count + 1)}}>+</button>
      {props.children}
      {props.desc + props.date}
    </div>
  )
}
// PropTypes 如果写了就必须有值 不然会报错
EnergyChart.propTypes = {
  desc: PropTypes.string.isRequired,
  date: PropTypes.number
  // children: PropTypes.isRequired
}
EnergyChart.defaultProps = {
  desc: "历史图",
  date: 123
}
