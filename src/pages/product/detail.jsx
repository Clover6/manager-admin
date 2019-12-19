import React, { Component } from 'react'
import LinkButton from '../../components//link-button'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategoryName } from '../../api'
import {
  Card,
  Icon,
  List
} from 'antd'

const Item = List.Item

export default class Detail extends Component {

  state = {
    cName1: '', // 一级分类名称
    cName2: '', // 二级分类名称
  }

  async componentDidMount () {
    const {pCategoryId, categoryId} = this.props.location.state
    
    if(pCategoryId==='0') { 
      const result = await reqCategoryName(categoryId)
      const cName1 = result.data.name
      this.setState({cName1})
    } else {
      const results = await Promise.all([reqCategoryName(pCategoryId), reqCategoryName(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }
  }

  render() {

    const { name, desc, price, detail, imgs } = this.props.location.state
    const {cName1, cName2} = this.state

    const title = (
      <span>
        <LinkButton>
          <Icon
            type='arrow-left'
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>{cName1} {cName2 ? ' --> ' + cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    src={BASE_IMG_URL + img}
                    className="product-img"
                    alt="img"
                  />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}>
            </span>
          </Item>
        </List>
      </Card>
    )
  }
}
