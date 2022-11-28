import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL }  from "../constants";

class NewStudentForm extends React.Component {
  state = {
    id:0,
    name: "",
    familyName:"",
    email:"",
  };

 componentDidMount() {
    if (this.props.student) {
      const { id,name,familyName,email } = this.props.student;
      this.setState({ id,name,familyName,email });
      console.log("okkkk",{ id,name,familyName,email })
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
    axios.put(API_URL + 'students/'+this.state.id+'/', this.state).then(() => {
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
          <Label for="name">Name*:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="familyName">family Name*:</Label>
          <Input
            type="text"
            name="familyName"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.familyName)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">email</Label>
          <Input
            type="text"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>

        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm;