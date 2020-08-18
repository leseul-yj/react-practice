import React , {useState} from 'react';
import './departDate.css';
import { DatePicker, message } from 'antd';
import moment from 'moment';
moment.locale('zh-cn');  

export default function DepartDate(props) {
  const defaultValue = moment();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(defaultValue.format("YYYY-MM-DD"));
  const handleChange = (date, dateString)=>{
    message.info('您选择的日期是: ' + dateString);
    setOpen(false);
    setDate(dateString);
  }
  return (
    <div>
      <DatePicker 
      onOpenChange={() => {setOpen(true)}} 
      onChange={handleChange}
      defaultValue={moment(defaultValue,"YYYY-MM-DD")} 
      />
    </div>
  )
}