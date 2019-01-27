import React, { Component } from 'react'
import { Container, Header, Segment, Message, Table, Button, Icon, Input, List } from 'semantic-ui-react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import ContactRow from './components/ContactRow'

class App extends Component {
  state = {
    contacts: [],
    error: false,
    isLoaded: false,
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
    }))
  }

  handleOpenConfirmDelete = () => this.setState({ isConfirmDeleteOpen: true })

  handleCloseConfirmDelete = () => this.setState({ isConfirmDeleteOpen: false })

  render() {
    const { contacts, error, isLoaded } = this.state

    return (
      <Container style={{ margin: '1rem' }}>
        <Header as="h1">Phonebook</Header>
        <List bulleted>
          <List.Item>By <a href="https://twitter.com/simon_ansell" target="_blank" rel="noopener noreferrer">Simon Ansell</a> for <a href="https://www.hackajob.co" target="_blank" rel="noopener noreferrer">hackajob</a></List.Item>
          <List.Item>Type in the inputs to filter</List.Item>
          <List.Item>Mouseover a contact row to reveal edit and delete actions, or click on a contact row to edit.</List.Item>
        </List>
        <Segment loading={!isLoaded}>
          {error && <Message error>Something went wrong: {error}</Message>}
          {!error && contacts && (
            <>
              <div style={{ display:'flex', width: '100%' }}>
                <Header as="h2" style={{ flex: 1 }}>{contacts.length} contacts</Header>
                <Button primary icon="plus" labelPosition="right" content="New contact" />
              </div>
              {contacts.length > 0 && (
                <Table selectable size="small" compact basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={3}><Input size="small" placeholder="name" /><Icon name="sort" /></Table.HeaderCell>
                      <Table.HeaderCell width={3}><Input size="small" placeholder="phone_number" /><Icon name="sort" /></Table.HeaderCell>
                      <Table.HeaderCell width={8}><Input size="small" placeholder="address" /><Icon name="sort" /></Table.HeaderCell>
                      <Table.HeaderCell width={2}>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {contacts.map((c, i) => (
                      <ContactRow
                        key={i}
                        contact={c}
                        handleDelete={this.handleDeleteContact}
                      />
                    ))}
                  </Table.Body>
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
