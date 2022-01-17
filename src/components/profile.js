import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './css/home.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import Head from './header.js';
import {ReactSession} from 'react-client-session';


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Home extends Component {

    constructor(props) {
      ReactSession.setStoreType("localStorage");
      super(props);
      this.state = {
          Login:ReactSession.get("login"),
          Name:ReactSession.get("name"),
          Email:ReactSession.get("email"),
          Phone:ReactSession.get("phone"),
          Company:ReactSession.get("company")
      }
  }

  clear(event) {
    
      ReactSession.setStoreType("localStorage");
      ReactSession.remove("login");
      ReactSession.remove("email");
      ReactSession.remove("qrcode");
      window.location.href="/home";
      event.preventDefault();
  }

  render() {
    return (
      <Layout>
      <Head/>
      <Layout>
      { this.state.Login === 'true' ?
            <Sider width={200} className="site-layout-background1">
            <Menu
              mode="inline"
              defaultSelectedKeys={['2']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1"  title="Awaar">
                <Menu.Item key="1"><a href="/home">Home</a></Menu.Item>
                <Menu.Item key="2"><a href="/profile">Profile</a></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
           :
           null
        }
        
        <Layout style={{ padding: '0 20px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
          </Breadcrumb>
          <Content className="site-layout-background1">
             <h1>Name: {this.state.Name}</h1><br />
             <h1>Email: {this.state.Email}</h1><br />
             <h1>Phone: {this.state.Phone}</h1><br />
             <h1>Company: {this.state.Company}</h1><br />
          </Content>
        </Layout>
      </Layout>
    </Layout>
    );
  }
}

export default Home;

