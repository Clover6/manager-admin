import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo192.png'
import { Form, Icon, Input, Button } from 'antd'
import { getLogin } from '../../redux/action'

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
       this.props.getLogin(values)
      }
    })
  }

  render() {
    const { users } = this.props

    if (users && users._id) {
      return <Redirect to='/home' />
    }

    const { getFieldDecorator } = this.props.form

    return (
      <div className='login'>
        <header className='login-hander'>
          <img src={logo} alt="" />
          <h1>后台管理系统</h1>
        </header>
        <section className='login-section'>
          <h2>管理登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                  { min: 4, message: 'your username is max 4!' },
                  { max: 12, message: 'your username is max 12!' }
                ],
                initialValue: 'admin'
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                  { min: 3, message: 'your password is max 3!' },
                  { max: 18, message: 'your password is max 18!' },
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = {
  getLogin
}

const WrappedLoginForm = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)
