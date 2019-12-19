import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option


class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setFrom:PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.setFrom(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { categorys, parentId } = this.props
    
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(<Select>
              <Option value='0'>一级分类</Option>
              {
                categorys.map(c => <Option value={c._id}>{c.name}</Option>)
              }
            </Select>)
          }
        </Item>
        <Item>
          {
            getFieldDecorator('categoryName', {
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