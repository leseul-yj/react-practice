import React from 'react';
import {render} from 'react-dom';
import Api from './router/api';
import "./css/ArmCommon.css"
import ThreeMap from './components/ArmParam';

const App = (props)=>(
  <h1>666666</h1>
);
let data = {
  "dsItemIds":
    [
      "@850|joint1_angle",
      "@850|joint1_current",
      "@850|joint2_angle",
      "@850|joint2_current",
      "@850|joint3_angle",
      "@850|joint3_current",
      "@850|joint4_angle",
      "@850|joint4_current",
      "@850|joint5_angle",
      "@850|joint5_current",
      "@850|joint6_angle",
      "@850|joint6_current"
    ]}
    Api.getRealtimeData(data)
  .subscribe((resp)=>{
    console.log(resp)
  })

render(<ThreeMap/>, document.getElementById('content'));