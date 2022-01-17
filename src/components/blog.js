import React, { Component } from 'react';
import './css/App.css';
import axios from "axios";
import { Form, Input, Button, message ,Layout} from "antd";
import qs from "qs";
import {ReactSession} from 'react-client-session';
import Head from './header.js';
const FormItem = Form.Item;


class Blog extends Component {
  constructor(props) {
    ReactSession.setStoreType("localStorage");
    super(props);
    this.state = {
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
            title: values.title,
            description: values.description,
            token: ReactSession.get("token"),
          };
                axios({
                  method: "post",
                  url:backend+"/blogs",
                  headers: { 
                        'Accept':'application/json',
                        'Authorization':'Bearer '+ReactSession.get("token"),
                  },
                  data: qs.stringify(details),
                })
                .then(function(response) {
                  if (response.data.success===false) {
                    message.error(response.data.message)
                    self.setState({ value: false });
                  } else {
                    message.success(response.data.message)
                    self.setState({ value: true });
                    setTimeout(()=>{window.location.reload();},800);
                  }
                })
            });
         };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <><Layout>
      <Head/>
    </Layout><><div className={"lContainer blogform"}>
          <div className="lItem">
            <div className="loginForm d-flex justify-content-center align-items-center">
              <h2>Add Blog</h2>
              <Form onSubmit={this.handleSubmit} className="login-form rounded p-4 p-sm-3">
              <FormItem>
                  {getFieldDecorator("title", {
                    rules: [{ required: true, message: "Please enter blog title" }]
                  })(
                    <Input type="text" placeholder="Blog Title" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("description", {
                    rules: [{ required: true, message: "Please enter blog description" }]
                  })(
                    <Input.TextArea rows="20" type="text" placeholder="Blog Description" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" disabled={this.state.value} htmlType="submit" className="login-form-button">Save</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div></></>
    );
  }
}

const App = Form.create()(Blog);

export default App;