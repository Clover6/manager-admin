import React, { Component } from 'react'
import './index.less'
import LinkButton from '../link-button'
import { withRouter } from 'react-router-dom'
import { formateDate } from '../../utils/dataTime'
import menuList from '../../config/menu-data'
import { reqWeather } from '../../api'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import {logout} from '../../redux/action'

const { confirm } = Modal


class Head extends Component {

  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  getCurrenTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const child = item.children
        const citem = child.find(c => path.indexOf(c.key) === 0)
        if (citem) {
          title = citem.title
        }
      }
    })
    return title
  }

  getCurrentTime = () => {
    this.setInerval = setInterval(() => {
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000)
  }

  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({ dayPictureUrl, weather })
  }

  layout = () => {
    confirm({
      title: '确定要退出吗?',
      content: 'see you later',
      onOk: () => {
        this.props.logout()
      }
    });
  }

  componentDidMount() {
    this.getCurrentTime()
    this.getWeather()
  }

  componentWillMount() {
    clearInterval(this.setInerval)
  }


  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const title = this.getCurrenTitle()
    return (
      <div className='head'>
        <div className="head-top">
          <span>欢迎，admin</span>
          <LinkButton onClick={this.layout}>退出</LinkButton>
        </div>
        <div className="head-bottom">
          <div className="head-bottom-left">{title}</div>
          <div className="head-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({}),
 {logout}
)(withRouter(Head))