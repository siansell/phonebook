import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ContactDetailForm extends Component {
  render() {
    const { contact, handleCancel, handleSave } = this.props
    const headerText = contact ? `Edit ${contact.name}` : 'Add new contact'

    return (
      <>
        <Header as="h2">{headerText}</Header>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button primary onClick={handleSave}>{contact ? 'Save' : 'Add'}</Button>
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
  contact: null,
}

export default ContactDetailForm
