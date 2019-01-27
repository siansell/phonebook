import React, { Component } from 'react'
import { Container, Header, Segment, Message, Table, Button, List } from 'semantic-ui-react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import ColumnHeader from './components/ColumnHeader'
import ContactRow from './components/ContactRow'
import TableHeader from './components/TableHeader'

class App extends Component {
  state = {
    contacts: [],
    error: false,
    filters: {
      name: '',
      phone_number: '',
      address: ''
    },
    isLoaded: false,
    visibleContacts: [],
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://www.mocky.io/v2/581335f71000004204abaf83')
      const contactsWithId = response.data.contacts.map((c, i) => ({
        ...c,
        id: i,
      }))
      this.setState({
        contacts: contactsWithId,
        visibleContacts: contactsWithId,
        isLoaded: true,
      })
    } catch (e) {
      this.setState({
        error: e.message,
        isLoaded: true,
      })
    }
  }

  handleDeleteContact = (id) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== id),
      visibleContacts: state.visibleContacts.filter(c => c.id !== id)
    }))
  }

  handleFilterChange = (field, value) => {
    // min 3 characters
    const effectiveValue = value.trim().length < 3 ? '' : value
    this.setState(state => ({
      filters: {
        ...state.filters,
        [field]: effectiveValue.toLowerCase(),
      },
    }), () => {
      this.setState(state => ({
        visibleContacts: state.contacts.filter(c => {
          let isVisible = true
          Object.keys(state.filters).forEach(f => {
            if (state.filters[f].length && !c[f].trim().toLowerCase().includes(state.filters[f])) {
              isVisible = false
            }
          })
          return isVisible
        })
      }))
    })
  }

  render() {
    const { contacts, visibleContacts, filters, error, isLoaded } = this.state

    const isFilterActive = Object.keys(filters).some(f => filters[f].length > 0)

    return (
      <Container style={{ margin: '1rem' }}>
        <Header as="h1">Phonebook</Header>
        <List bulleted>
          <List.Item>By <a href="https://twitter.com/simon_ansell" target="_blank" rel="noopener noreferrer">Simon Ansell</a> for <a href="https://www.hackajob.co" target="_blank" rel="noopener noreferrer">hackajob</a>.</List.Item>
          <List.Item>Type in the inputs to filter (min 3 characters).</List.Item>
          <List.Item>Mouseover a contact row to reveal edit and delete actions, or click on a contact row to edit.</List.Item>
        </List>
        <Segment loading={!isLoaded}>
          {error && <Message error>Something went wrong: {error}</Message>}
          {!error && contacts && (
            <>
              <div style={{ display:'flex', width: '100%' }}>
                <TableHeader
                  isFilterActive={isFilterActive}
                  nContacts={contacts.length}
                  nVisibleContacts={visibleContacts.length}
                />
                <div>
                  <Button primary icon="plus" labelPosition="right" content="New contact" />
                </div>
              </div>
              {contacts.length > 0 && (
                <Table selectable stackable size="small" compact>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={3}>
                        <ColumnHeader
                          field="name"
                          handleFilterChange={this.handleFilterChange}
                          title="Name"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell width={2}>
                        <ColumnHeader
                          field="phone_number"
                          handleFilterChange={this.handleFilterChange}
                          title="Phone"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell width={5}>
                        <ColumnHeader
                          field="address"
                          handleFilterChange={this.handleFilterChange}
                          title="Address"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell width={1}>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  {visibleContacts.length > 0 && (
                    <Table.Body>
                      {visibleContacts.map((c, i) => (
                        <ContactRow
                          key={i}
                          contact={c}
                          handleDelete={this.handleDeleteContact}
                        />
                      ))}
                    </Table.Body>
                  )}
                </Table>
              )}
            </>
          )}
        </Segment>
      </Container>
    )
  }
}

export default App
