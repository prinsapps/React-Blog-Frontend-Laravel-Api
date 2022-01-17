import React, { Component } from 'react';
import './css/App.css';
import axios from "axios";
import { Form, Icon, Input, Button, message ,Layout,Breadcrumb} from "antd";
import qs from "qs";
import {ReactSession} from 'react-client-session';
import Head from './header.js';
const FormItem = Form.Item;

class email extends Component {
  constructor(props) {
      ReactSession.setStoreType("localStorage");
      super(props);
      const queryParams = new URLSearchParams(window.location.search);
      const email = queryParams.get('email');
      this.state = {
          email:email
      }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
        var details = {password: values.password,cpass:values.cpass,email:this.state.email};
        var backend = "http://localhost:5000";
        axios({
                method: "post",
                url:backend+"/new_password",
                headers: { "content-type": "application/x-www-form-urlencoded" },
                data: qs.stringify(details),
            }).then(function(response) {
                if (response.data.status===400) {
                    message.error(response.data.message)
                } else {
                    message.success(response.data.message)
                    setTimeout(()=>{window.location = "/login"},800);
                }
            })
        }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const validatePassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Password and confirm password are not same');
      } else {
        callback();
      }
    };
    return (
      <><Layout>
      <Head/>
    </Layout><Layout>
          <Breadcrumb style={{ margin: '16px 24px' }}>
            <Breadcrumb.Item>Awaar</Breadcrumb.Item>
            <Breadcrumb.Item>Signup</Breadcrumb.Item>
          </Breadcrumb>
        </Layout><><div className={"lContainer"}>
          <div className="lItem">
            <div className="loginForm">
              <h2>Set new password here</h2>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Please enter your Password" }]
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="New Password" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("cpass", {
                    rules: [{ required: true, message: "Please your Password again" },{ validator: validatePassword }]
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Re-type Password" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">Reset</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div></></>
    );
  }
}

const Verifyemail = Form.create()(email);

export default Verifyemail;