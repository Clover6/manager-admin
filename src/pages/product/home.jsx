import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkButton from '../../components//link-button'
import { PAGE_SIZE_SEX } from '../../utils/constants'
import {
  Card,
  Select,
  Input, Button,
  Icon, Table, message
} from 'antd'
import {
  getProduct,
  getSearchProduct,
  getUpdateStatus
} from '../../redux/action'

const Option = Select.Option

class Home extends Component {

  getPage = (pageNum) => {
    this.pageNum = pageNum
    
    const { searchName, searchType } = this.state

    if (searchName) {
      this.props.getSearchProduct({ pageNum, pageSize: PAGE_SIZE_SEX, searchName, searchType })
    } else {
      this.props.getProduct(pageNum, PAGE_SIZE_SEX)
    }
  }

  componentDidMount() {
    this.getPage(1)
  }

  state = {
    searchType: 'productName',
    searchName: ''
  }

  updateStatus = async (productId, status) => {
    const res = await this.props.getUpdateStatus(productId, status)
    if (res.status === 0) {
      message.success('更新商品状态成功')
      this.getPage(this.pageNum)
    }
  }

  render() {
    const { searchType, searchName } = this.state
    const { products, total } = this.props

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price,
        key: 'price',
      },
      {
        width: 100,
        title: '状态',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button type='primary' onClick={() => this.updateStatus(_id, newStatus)}>{status === 1 ? '下架' : '上架'}</Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            </span>
          )
        }
      },
    ]


    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => { this.setState({ searchType: value }) }}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={event => { this.setState({ searchName: event.target.value }) }}
        ></Input>
        <Button type='primary' onClick={() => this.getPage(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type='plus'></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          bordered
          dataSource={products}
          columns={columns}
          pagination={{
            current:this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE_SEX,
            showQuickJumper: true,
            onChange: this.getPage
          }}

        />
      </Card>
    )
  }
}


const mapStateToProps = state => {
  return {
    products: state.products,
    total: state.total,
  }
}

const mapDispatchToProps = {
  getProduct,
  getSearchProduct,
  getUpdateStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
