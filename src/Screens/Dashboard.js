import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  FormControl,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BounceLoader from 'react-spinners/BounceLoader';
import UserActions, {
  submittingUser,
  postUserResponse,
} from '../Redux/UserRedux';
import '../App.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      telephoneNumber: '',
      fullAddress: '',
      ssn: '',
      firstNameError: '',
      lastNameError: '',
      telephoneNumberError: '',
      fullAddressError: '',
      ssnError: '',
    };
  }

  validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleCreateUser = () => {
    const {
      firstName,
      lastName,
      telephoneNumber,
      fullAddress,
      ssn,
    } = this.state;

    if (firstName === null || firstName.length === 0) {
      this.setState({
        firstNameError: 'First name is required',
      });
    }

    if (lastName === null || lastName.length === 0) {
      this.setState({
        lastNameError: 'Last name is required',
      });
    }

    if (telephoneNumber === null || telephoneNumber.length === 0) {
      this.setState({
        telephoneNumberError: 'Telephone number is required',
      });
    }

    if (fullAddress === null || fullAddress.length === 0) {
      this.setState({
        fullAddressError: 'Full address is required',
      });
    }

    if (ssn === null || ssn.length === 0) {
      this.setState({
        ssnError: 'SSN is required',
      });
    }

    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      telephoneNumber.length > 0 &&
      fullAddress.length > 0 &&
      ssn.length > 0
    ) {
      this.setState({ modalVisible: false });

      this.props.createUserRequest({
        firstName: firstName,
        lastName: lastName,
        telephoneNumber: telephoneNumber,
        fullAddress: fullAddress,
        ssn: ssn,
      });
    }
  };

  handleSubmitAnother = () => {
    this.props.userReset();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + 'Error']: '',
    });
  };

  render() {
    const { submittingUser, userCreated } = this.props;

    return (
      <Container fluid>
        <Modal
          id="loading-modal"
          show={submittingUser}
          animation={false}
          size="lg"
          aria-labelledby="loading-modal"
          centered
        >
          <BounceLoader size={150} color={'orange'} loading={submittingUser} />
        </Modal>
        <br />
        <Row>
          <Col sm={7}>
            <h1>Create user</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={7} className="img-tile list">
            {userCreated && userCreated.success ? (
              <>
                <p>Perfect! I have captured all your info.</p>
                <Button
                  variant="dark"
                  className="float-right"
                  onClick={this.handleSubmitAnother}
                >
                  Submit once more
                </Button>
              </>
            ) : (
              <>
                <Form>
                  <Form.Group as={Row} controlId="formFirstName">
                    <Form.Label column sm={2}>
                      First name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="firstName"
                        type="text"
                        aria-label="First name"
                        placeholder="First name"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        isInvalid={this.state.firstNameError}
                      />
                      <FormControl.Feedback type="invalid">
                        {this.state.firstNameError}
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formLastName">
                    <Form.Label column sm={2}>
                      Last name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="lastName"
                        type="text"
                        aria-label="Last name"
                        placeholder="Last name"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        isInvalid={this.state.lastNameError}
                      />
                      <FormControl.Feedback type="invalid">
                        {this.state.lastNameError}
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formTelephoneNumber">
                    <Form.Label column sm={2}>
                      Telephone number
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="telephoneNumber"
                        type="phone"
                        pattern="\d*"
                        aria-label="Phone"
                        placeholder="Telephone number"
                        onChange={this.handleChange}
                        value={this.state.telephoneNumber}
                        isInvalid={this.state.telephoneNumberError}
                      />
                      <FormControl.Feedback type="invalid">
                        {this.state.telephoneNumberError}
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formAddress">
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="fullAddress"
                        type="textarea"
                        aria-label="Full address"
                        placeholder="Full address"
                        onChange={this.handleChange}
                        value={this.state.fullAddress}
                        isInvalid={this.state.fullAddressError}
                      />
                      <FormControl.Feedback type="invalid">
                        {this.state.fullAddressError}
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formSSN">
                    <Form.Label column sm={2}>
                      SSN
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        name="ssn"
                        type="text"
                        aria-label="Social security number"
                        placeholder="SSN"
                        onChange={this.handleChange}
                        value={this.state.ssn}
                        isInvalid={this.state.ssnError}
                      />
                      <FormControl.Feedback type="invalid">
                        {this.state.ssnError}
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>
                </Form>
                <Button
                  variant="dark"
                  className="float-right"
                  onClick={this.handleCreateUser}
                >
                  Create
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userCreated: postUserResponse(state),
  submittingUser: submittingUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  createUserRequest: ({
    firstName,
    lastName,
    telephoneNumber,
    fullAddress,
    ssn,
  }) =>
    dispatch(
      UserActions.postUserRequest({
        firstName,
        lastName,
        telephoneNumber,
        fullAddress,
        ssn,
      }),
    ),
  userReset: () => dispatch(UserActions.userReset()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard),
);
