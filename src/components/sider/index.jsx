import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo192.png'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menu-data'

const { SubMenu } = Menu

class Sider extends Component {

  getMenuList = menu => {
    const path = this.props.location.pathname
    return menu.reduce((prev, item) => {
      if (item.children) {
        const CItem = item.children.find(child => path.indexOf(child.key) === 0)
        if (CItem) {
          this.openKey = item.key
        }

        prev.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuList(item.children)}
          </SubMenu>
        )
      } else {
        prev.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      return prev
    }, [])
  }

  render() {
    let path = this.props.location.pathname

    if (path.indexOf('/product') === 0) {
      path = '/product'
    }

    const menulis = this.getMenuList(menuList)
    const openKey = this.openKey

    return (
      <div className='sider'>
        <Link to='/' className='sider-header'>
          <img src={logo} alt="" />
          <h1>管理后台</h1>
        </Link>

        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >{menulis}</Menu>
      </div>
    )
  }
}
export default withRouter(Sider)