import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Form,
  Input
} from 'antd'

const Item = Form.Item


class UpdateForm extends Component {

  static propTypes={
    category:PropTypes.string.isRequired,
    setFrom:PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.setFrom(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {categoryName}=this.props

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName,
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

export default Form.create()(UpdateForm)