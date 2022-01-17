import React, { Component } from 'react';
import './css/App.css';
import axios from "axios";
import { Form, Icon, Input, Button,Breadcrumb, message ,Layout} from "antd";
import qs from "qs";
import {ReactSession} from 'react-client-session';
import Head from './header.js';
const FormItem = Form.Item;


class Verifyform extends Component {

  constructor(props) {
    ReactSession.setStoreType("localStorage");
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var backend = "http://localhost:5000";
        var details = {token: values.token,main_token:ReactSession.get("otp")};
        axios({
          method: "post",
          url:backend+"/token",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(details),
        })
        .then(function(response) {
          if (response.data.status===400) {
            message.error(response.data.message)
          } else {
            message.success(response.data.message)
            ReactSession.set("login", "true");
            sessionStorage.setItem("isUserLogged", true);
            ReactSession.set("otp", "");
            setTimeout(()=>{window.location = "/home"},800);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    ReactSession.setStoreType("localStorage");
    return (
      <><Layout>
        <Head/>
      </Layout><Layout>
          <Breadcrumb style={{ margin: '16px 24px' }}>
            <Breadcrumb.Item>Awaar</Breadcrumb.Item>
            <Breadcrumb.Item>Login</Breadcrumb.Item>
            <Breadcrumb.Item>Verify</Breadcrumb.Item>
          </Breadcrumb>
        </Layout><div className={"lContainer"}>
          <div className="lItem">
            <div className="loginForm">
              <h2>Two step verification</h2>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                   <h5>Please check you email as you have received an otp.</h5>
                  {/* <img width={200} alt="qrcode" src={ReactSession.get("qrcode")} /> */}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("token", {
                    rules: [{ required: true, message: "Please enter your Token" }]
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="text" placeholder="Token" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div></>
    );
  }
}

const Verify = Form.create()(Verifyform);

export default Verify;










