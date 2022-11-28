import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL }  from "../constants";

class NewStudentForm extends React.Component {
  state = {
    id:0,
    name: "",
    familyName:"",
    group:"",
  };

 componentDidMount() {
    if (this.props.student) {
      const { id,name,familyName,group } = this.props.student;
      this.setState({ id,name,familyName,group });
      console.log("okkkk")
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("CHANGE !!!!")
  };

  createStudent = e => {
   e.preventDefault();
    axios.post(API_URL+'student/add/', this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + 'student/update/'+this.state.id, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };


  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.student ? this.editStudent : this.createStudent }>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            //value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="familyName">familyName</Label>
          <Input
            type="text"
            name="familyName"
            onChange={this.onChange}
            //value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="group">group</Label>
          <Input
            type="text"
            name="group"
            onChange={this.onChange}
            //value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>

        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm;