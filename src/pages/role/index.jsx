import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import { connect } from 'react-redux'
import { PAGE_SIZE_SEX } from "../../utils/constants"
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { formateDate } from '../../utils/dataTime'
import { logout } from '../../redux/action'

class Role extends Component {
  state = {
    roles: [],
    role: {},
    isShowAdd: false,
    isShowAuth: false,
  }

  constructor(props) {
    super(props)
    this.auth = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }


  onRow = (role) => {
    return {
      onClick: event => {
        this.setState({
          role
        })
      },
    }
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          isShowAdd: false
        })
        const { roleName } = values
        this.form.resetFields()
        const result = await reqAddRole(roleName)

        if (result.status === 0) {
          message.success('添加角色成功')
          const role = result.data
          this.setState(state => ({
            roles: [...state.roles, role]
          }))
        } else {
          message.success('添加角色失败')
        }
      }
    })
  }

  updateRole = async () => {
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = this.props.user.username

    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      if (role._id === this.props.user.role_id) {
        this.props.logout()
        message.success('当前用户角色权限成功')
      } else {
        message.success('设置角色权限成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }
    }
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {

    const { roles, role, isShowAdd, isShowAuth } = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE_SEX }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({
                role
              })
            }
          }}
          onRow={this.onRow}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.from.resetFields()
          }}
        >
          <AddForm
            setFrom={(from) => { this.from = from }} />
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { logout }
)(Role)