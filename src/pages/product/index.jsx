import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import './index.less'
import Home from './home'
import AddUpdate from './add-update'
import Detail from './detail'


export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={Home} exact></Route>
        <Route path='/product/addupdate' component={AddUpdate}></Route>
        <Route path='/product/detail' component={Detail}></Route>
        <Redirect to='/product'></Redirect>
      </Switch>
    )
  }
}
