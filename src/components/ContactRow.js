import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'

class ContactRow extends Component {
  state = {
    isSelected: false,
  }

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

    const { isSelected } = this.state

    return (
      <Table.Row
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{phone_number}</Table.Cell>
        <Table.Cell>{address}</Table.Cell>
        <Table.Cell>
          {isSelected && (
            <>
              <Icon name="edit" color="blue" />
              <Icon name="delete" color="red" />
            </>
          )}
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default ContactRow
