import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ContactDetailForm extends Component {
  render() {
    const { contact, handleCancel, handleSave } = this.props
    return (
      <>
        <Header as="h2">Edit {contact.name}</Header>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </>
    )
  }
}

ContactDetailForm.propTypes = {
  contact: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
}
ContactDetailForm.defaultProps = {
  contact: { name: '', address: '', phone_number: '' },
}

export default ContactDetailForm
