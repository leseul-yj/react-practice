import React,{Component} from 'react'
import {Overview,HistoryQuery,Meters, NotFound, Energy} from './views'
import {Route,NavLink as Link,Redirect,Switch} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            
            {/* Link 相当于a标签   navLink就是点击增加了一个active的类名*/}
            <Link to="/overview">Overview</Link>
          </div>
          <div>
            <Link to="HistoryQuery">HistoryQuery</Link>
          </div>
          <div>
            <Link to="meters">Meters</Link>
          </div>
        </div>
        <div>
          <Switch>
            {/* <Route component={Overview} path="/overview" /> */}
            <Route render={(routeprops)=>{
              return <Overview {...routeprops} />
            }} path="/overview" />

            <Route component={HistoryQuery} path="/HistoryQuery" />
            <Route component={Meters} path="/meters" exact/>
            <Route component={Energy} path="/meters/:id" />
            <Route component={NotFound} path="/404" />
            <Redirect to="/overview" from="/" exact />
            {/* <Redirect to="/404" /> */}
          </Switch>
        </div>

      </div>
    )
  }
}
export default App