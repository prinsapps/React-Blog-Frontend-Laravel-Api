import React, { Component } from 'react';
import './css/App.css';
import axios from "axios";
import { Form, Icon, Input, Button,Breadcrumb, message ,Layout} from "antd";
import qs from "qs";
import {ReactSession} from 'react-client-session';
import Head from './header.js';

const FormItem = Form.Item;
class Loginform extends Component {
  constructor(props) {
      ReactSession.setStoreType("localStorage");
      super(props);
      this.state = {
          Login:ReactSession.get("login"),
          value:false
      }
  }

  handleSubmit = e => {
    e.preventDefault();
    const self = this;
    self.setState({ value: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var backend = "http://localhost:5000";
        var details = {email: values.email,password: values.password};
        axios({
          method: "post",
          url:backend+"/admin-login",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(details),
        })
        .then(function(response) {
          ReactSession.setStoreType("localStorage");
          if (response.data.status===400) {
            message.error(response.data.message);
            self.setState({ value: false });
            ReactSession.set("adminlogin", "false");
          } else {
            message.success(response.data.message);
            self.setState({ value: true });
            sessionStorage.setItem("adminlogin", true);
            setTimeout(()=>{window.location = "/adminpanel"},800);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <><Layout>
        <Head/>
      </Layout><Layout>
          <Breadcrumb style={{ margin: '16px 24px' }}>
            <Breadcrumb.Item>Awaar</Breadcrumb.Item>
            <Breadcrumb.Item>Login</Breadcrumb.Item>
          </Breadcrumb>
        </Layout><><div className={"lContainer"}>
          <div className="lItem">
            <div className="loginForm d-flex justify-content-center align-items-center">
              <h2>Login</h2>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Please enter your email" }]
                  })(
                    <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="email" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Please enter your Password" }]
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" disabled={this.state.value} htmlType="submit" className="login-form-button">Log in</Button>
                  <span className="signup_detail">Not registered yet?&nbsp;</span><a className="link1"href="/signup">Click here</a> <br />
                  <span className="forgot_pass">Forgot password?&nbsp;</span><a className="link3"href="/forgot">Reset here</a> <br />
                </FormItem>
              </Form>
            </div>
          </div>
        </div></></>
    );
  }
}

const App = Form.create()(Loginform);

export default App;













