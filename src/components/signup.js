import React, { Component } from 'react';
import './css/App.css';
import axios from "axios";
import { Form, Icon, Input, Button, message ,Layout} from "antd";
import qs from "qs";
import {ReactSession} from 'react-client-session';
import Head from './header.js';
const FormItem = Form.Item;

class Signupform extends Component {
  constructor(props) {
      ReactSession.setStoreType("localStorage");
      super(props);
      this.state = {
          email:"null",
          value:false
      }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const self = this;
      self.setState({ value: true });
        var backend = "http://localhost:8000/api/v1";
        var details = {
            first_name: values.firstname,
            last_name: values.lastname,
            email: values.email,
            password: values.password,
            c_password:values.c_password,
            phone:values.phone
          };
                axios({
                  method: "post",
                  url:backend+"/register",
                 // headers: { "content-type": "application/x-www-form-urlencoded" },
                  data: qs.stringify(details),
                })
                .then(function(response) {
                  if (response.data.success===false) {
                    message.error(response.data.message)
                    self.setState({ value: false });
                  } else {
                    message.success(response.data.message)
                    self.setState({ value: true });
                    ReactSession.set("token", response.data.data.token);
                    ReactSession.set("name", response.data.data.name);
                    localStorage.setItem('token', response.data.data.token);
                    setTimeout(()=>{window.location = "/blog"},800);
                  }
                })
            });
         };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { email } = this.state;
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
    </Layout><><div className={"lContainer"}>
          <div className="lItem">
            <div className="loginForm d-flex justify-content-center align-items-center">
              <h2>Signup</h2>
              <Form onSubmit={this.handleSubmit} className="login-form rounded p-4 p-sm-3">
              <FormItem>
                  {getFieldDecorator("firstname", {
                    rules: [{ required: true, message: "Please enter your first name" }]
                  })(
                    <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} type="text" placeholder="First Name" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("lastname", {
                    rules: [{ required: true, message: "Please enter your last name" }]
                  })(
                    <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} type="text" placeholder="Last Name" />
                  )}
                </FormItem>
                <FormItem validateStatus={email.validateStatus} help={email.errorMsg}>
                  {getFieldDecorator("email", {rules: [{ required: true, message: "Please enter your email" }]
                  })(
                    <Input prefix={<Icon type="user" value="12" style={{ color: "rgba(0,0,0,.25)" }} />}  type="text" placeholder="email" />
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
                  {getFieldDecorator("c_password", {
                    rules: [{ required: true, message: "Please enter your Password again" },{ validator: validatePassword }]
                  })(
                    <Input dependencies={['password']} prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Confirm Password" />
                  )}
                </FormItem>
                
                <FormItem>
                  {getFieldDecorator("phone", {
                    rules: [{ required: true, message: "Please enter your Phone Number" }]
                  })(
                    <Input prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />} type="text" placeholder="Contact number" />
                  )}
                </FormItem>

                <FormItem>
                  <Button type="primary" disabled={this.state.value} htmlType="submit" className="login-form-button">Signup</Button>
                  <span className="login_detail">Already registered?&nbsp;</span><a className="link" href="/login">Click here</a><br/>
                </FormItem>
              </Form>
            </div>
          </div>
        </div></></>
    );
  }
}

const App = Form.create()(Signupform);

export default App;
















