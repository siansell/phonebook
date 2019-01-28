import React, { Component } from 'react'
import { Header, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { isEmpty } from 'validator'

class ContactDetailForm extends Component {
  state = {
    editedContact: this.props.contact || { name: '', address: '', phone_number: ''}, // stores the values that are being edited
    validationErrors: [],
  }

  handleInputChange = (e, { value }) => {
    const field = e.target.id
    this.setState(state => ({
      editedContact: {
        ...state.editedContact,
        [field]: value,
      }
    }))
  }

  handleSave = () => {
    const { handleSaveContact } = this.props
    const { editedContact } = this.state

    // V basic form validation
    const validationErrors = []
    if (isEmpty(editedContact.name)) validationErrors.push('name')
    if (isEmpty(editedContact.phone_number)) validationErrors.push('phone_number')
    if (isEmpty(editedContact.address)) validationErrors.push('address')

    if (validationErrors.length === 0) {
      handleSaveContact(editedContact)
    } else {
      this.setState({ validationErrors })
    }
  }

  render() {
    const { contact, handleCancel } = this.props
    // If this.props.contact is null, we're in Add mode. Otherwise Edit mode.
    const headerText = contact ? `Edit ${contact.name}` : 'Add new contact'

    const { editedContact, validationErrors } = this.state

    return (
      <>
        <Header as="h2">{headerText}</Header>
        <Form onSubmit={this.handleSave}>
          <Form.Group>
            <Form.Input
              error={validationErrors.includes('name')}
              id="name"
              label="Name"
              onChange={this.handleInputChange}
              placeholder="Name"
              required
              value={editedContact.name}
              width={8}
            />
            <Form.Input
              error={validationErrors.includes('phone_number')}
              id="phone_number"
              label="Phone"
              onChange={this.handleInputChange}
              placeholder="Phone"
              required
              value={editedContact.phone_number}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              error={validationErrors.includes('address')}
              id="address"
              label="Address"
              onChange={this.handleInputChange}
              placeholder="Address"
              required
              value={editedContact.address}
              width={16}
            />
          </Form.Group>
          <Form.Group>
            {/* https://stackoverflow.com/questions/50489891/semantic-ui-react-input-field-auto-submit-triggers-wrong-behavior */}
            <Button type="reset" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" onClick={this.handleSave} primary>{contact ? 'Save' : 'Add'}</Button>
          </Form.Group>
        </Form>
      </>
    )
  }
}

ContactDetailForm.propTypes = {
  contact: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleSaveContact: PropTypes.func.isRequired,
}
ContactDetailForm.defaultProps = {
  contact: null,
}

export default ContactDetailForm
