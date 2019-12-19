import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Form,
  Input
} from 'antd'

const Item = Form.Item


class AddForm extends Component {
  static propTypes = {
    setFrom:PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.setFrom(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 }, 
      wrapperCol: { span: 15 },
    }
    
    return (
      <Form label='角色名称' {...formItemLayout}>
        <Item>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules:[
                {required:true,message:'请输入'}
              ]
            })(<Input placeholder='请输入'></Input>)
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)