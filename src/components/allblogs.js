import React from 'react';
import './css/admin.css';
import { Menu,message,Layout} from "antd";
import { Table } from 'antd';
import qs from "qs";
import axios from "axios";
const { Header } = Layout;



const columns = [
  {
    title: '#',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'email',
  }
];

async function getusers() {

    const requestOptions = {
      method: 'get',
      headers: { 
                 'Accept': 'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token')
              },
     };

    const response = await fetch('http://localhost:8000/api/v1/blogs', requestOptions)
    const json = await response.json();
    return json.data;
}

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

class Allblogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:false, 
            posts: []
        };
    }
    

    handleClick(e) {
      e.preventDefault()
      const self = this;
      self.setState({ value: true });
      var backend = "http://localhost:5000";
      var details = {status: e.target.value,email:e.currentTarget.dataset.email};
        axios({
          method: "post",
          url:backend+"/updatestatus",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(details),
        })
        .then(function(response) {
          if (response.data.status===400) {
            message.error(response.data.message);
            self.setState({ value: false });
          } else {
            message.success(response.data.message);
            self.setState({ value: true });
            setTimeout(()=>{window.location.reload()},800);
          }
        })
    }

    componentDidMount() {
      getusers().then(text => {
        if(isEmpty(text)) {
            text.forEach((item, i) => {
              this.state.posts.push({"key":i+1,"name":item.title,"email":item.description})
            })
         }else{
          text.forEach((item, i) => {
            this.state.posts.push({"key":i+1,"name":item.title,"email":item.description})
          })
         }
          this.setState({posts:this.state.posts})
      });
    }      
  render() {
    return (
        <><Layout>
        <Header className="header">
        <Menu theme="dark" mode="horizontal" >
        <Menu.Item key="1"> <a href="/blog">Add blog</a></Menu.Item>
        </Menu>
      </Header>
      </Layout>
        <div className={"Container"}>
          <div className="Item">
            <div className="floginForm">
              <Table columns={columns} dataSource={this.state.posts} />
            </div>
          </div>
        </div></>
    );
}
}

export default Allblogs;