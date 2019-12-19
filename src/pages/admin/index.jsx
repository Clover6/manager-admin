import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Redirect, Route } from 'react-router-dom'

import Siders from '../../components/sider'
import Head from '../../components/head'

import Home from '../../pages/home'
import Category from '../../pages/category'
import Product from '../../pages/product'
import Role from '../../pages/role'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
import User from '../../pages/user'

import './index.less'
import { connect } from 'react-redux'
import NotFound from '../not-found/not-found'
const { Footer, Sider, Content } = Layout


class Admin extends Component {
  render() {
    const { users } = this.props

    if (!users || !users._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout className='layout'>
        <Sider><Siders /></Sider>
        <Layout>
          <Head />
          <Content className='content'>
            <Switch>
            <Redirect exact from='/' to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer className='footer'>欢迎使用xxx后台管理系统</Footer>
        </Layout>
      </Layout>
    )
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)