import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Button, Table, Modal } from 'antd'
import LinkButton from '../../components//link-button'
import {
  getCategory,
  getUpdateCategory,
  getAddCategory
} from '../../redux/action'
import AddFrom from './add-form'
import UpdateFrom from './update-form'

class Category extends Component {

  state = {
    parentId: '0',
    parentName: '',
    visible: 0
  }

  componentDidMount() {
    this.props.getCategory(this.state.parentId)
  }

  showsubcategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      this.props.getCategory(this.state.parentId)
    })
  }

  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: ''
    })
  }

  handleCancel = () => {
    this.from.resetFields()
    this.setState({
      visible: 0
    })
  }

  showAddCategroy = () => {
    this.setState({
      visible: 1
    })
  }

  showUpdateCategory = (category) => {
    this.category = category
    this.setState({
      visible: 2
    })
  }

  handleAdd = () => {
    this.from.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          visible: 0
        })
        const { parentId, categoryName } = values

        this.from.resetFields()
        const resParentId = await this.props.getAddCategory({ parentId, categoryName })
        if (resParentId === this.state.parentId) {
          this.props.getCategory(resParentId)
        } else if (resParentId === '0') {
          this.props.getCategory(resParentId)
        }
      }
    })
  }

  handleUpdate = () => {
    this.from.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          visible: 0
        })
        const categoryId = this.category._id
        const { categoryName } = values

        this.from.resetFields()
        const { status } = await this.props.getUpdateCategory({ categoryId, categoryName })
        if (status === 0) {
          this.props.getCategory(this.state.parentId)
        }
      }
    })
  }

  render() {
    const { categorys, subcategorys } = this.props
    const category = this.category || {}
    const title = this.state.parentId === '0' ? '一级分类' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类</LinkButton>
        <Icon type='arrow-right'></Icon>
        <span>{this.state.parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAddCategroy}>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdateCategory(category)}>修改分类</LinkButton>
            {this.state.parentId === '0' ?
              <LinkButton onClick={() => this.showsubcategorys(category)}>查看子分类</LinkButton> : null}
          </span>
        )
      }
    ]

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={this.state.parentId === '0' ? categorys : subcategorys}
          columns={columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="添加分类"
          visible={this.state.visible === 1}
          onOk={this.handleAdd}
          onCancel={this.handleCancel}
        >
          <AddFrom
            categorys={categorys}
            parentId={this.state.parentId}
            setFrom={(from) => { this.from = from }} />
        </Modal>
        <Modal
          title="修改分类"
          visible={this.state.visible === 2}
          onOk={this.handleUpdate}
          onCancel={this.handleCancel}
        >
          <UpdateFrom
            categoryName={category.name}
            setFrom={(from) => { this.from = from }} />
        </Modal>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    categorys: state.categorys,
    subcategorys: state.subcategorys,
  }
}

const mapDispatchToProps = {
  getCategory,
  getUpdateCategory,
  getAddCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
