import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './css/home.css';
import { Layout, Menu } from 'antd';
import {ReactSession} from 'react-client-session';
const { Header } = Layout;

class Head extends Component {

    constructor(props) {
      ReactSession.setStoreType("localStorage");
      super(props);
      this.state = {
          Login:ReactSession.get("token")
      }
  }
  

  clear(event) {
    
      ReactSession.setStoreType("localStorage");
      sessionStorage.removeItem('token');
      window.location="/home";
      event.preventDefault();
  }

  render() {
    return (
      <Layout>
      <Header className="header">
          { this.state.Login !== 'null' ? 
            <Menu theme="dark" mode="horizontal" >
              <Menu.Item key="1"> <a className="home1" href="/allblogs">All Blogs</a></Menu.Item>
              <Menu.Item key="2"> <a className="home2" href="/users">Users</a></Menu.Item>
            </Menu>
            :
            <Menu theme="dark" mode="horizontal" >
              <Menu.Item key="3"><a className="signup1"href="/signup">Signup</a></Menu.Item>
              <Menu.Item key="4"><a className="login1"href="/login">Login</a></Menu.Item>
            </Menu>
          }
      </Header>
    </Layout>
    );
  }
}

export default Head;
