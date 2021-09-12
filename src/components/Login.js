import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { emailChange, passwordChange, adminLogin } from "../actions/AuthAction";

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleLogin = () => {
    const { adminLogin, email, password } = this.props;
    adminLogin(email, password);
  };

  render() {
    const { email, password, emailChange, passwordChange } = this.props;

    return (
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={6}>
            <Form
              onSubmit={this.handleSubmit}
              style={{
                boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.15)",
                borderRadius: 10,
                padding: 30,
                marginTop: "3em",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => emailChange(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => passwordChange(e.target.value)}
                />
              </Form.Group>
              <Button
                onClick={this.handleLogin}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { email, password } = state.auth.form;

  return { email, password };
};

export default connect(mapStateToProps, {
  emailChange,
  passwordChange,
  adminLogin,
})(Login);
