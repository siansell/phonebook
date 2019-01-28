import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Confirm } from 'semantic-ui-react'

class ContactRow extends Component {
  state = {
    isConfirmDeleteOpen: false,
    isSelected: false,
  }

  handleConfirmDeleteContact = () => this.setState({ isConfirmDeleteOpen: true })

  handleDeleteContact = () => {
    const { contact } = this.props
    this.props.handleDelete(contact)
    this.handleCloseConfirmDelete()
  }

  handleEditContact = () => {
    const { contact } = this.props
    this.props.handleEdit(contact)
  }

  handleCloseConfirmDelete = () => this.setState({ isConfirmDeleteOpen: false })

  handleMouseEnter = () => this.setState({ isSelected: true })

  handleMouseLeave = () => this.setState({ isSelected: false })

  render() {
    const {
      contact: {
        name,
        phone_number,
        address,
      },
    } = this.props

    const { isConfirmDeleteOpen, isSelected } = this.state

    return (
      <>
        <Table.Row
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={{ cursor: 'pointer' }}
        >
          <Table.Cell onClick={this.handleEditContact}>{name}</Table.Cell>
          <Table.Cell onClick={this.handleEditContact}>{phone_number}</Table.Cell>
          <Table.Cell onClick={this.handleEditContact}>{address}</Table.Cell>
          <Table.Cell textAlign="right">
            {isSelected && (
              <Icon name="delete" color="red" onClick={this.handleConfirmDeleteContact} />
            )}
          </Table.Cell>
        </Table.Row>
        <Confirm
          content={`Are you sure you want to delete the contact ${name}?`}
          open={isConfirmDeleteOpen}
          onCancel={this.handleCloseConfirmDelete}
          onConfirm={this.handleDeleteContact}
        />
      </>
    )
  }
}

ContactRow.propTypes = {
  contact: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

export default ContactRow
