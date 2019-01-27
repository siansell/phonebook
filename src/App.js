import React, { Component } from 'react'
import { Container, Segment, Message, Table, Button } from 'semantic-ui-react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import AppHeader from './components/AppHeader'
import AppNotes from './components/AppNotes'
import AppTitle from './components/AppTitle'
import ContactRow from './components/ContactRow'
import TableHeader from './components/TableHeader'

class App extends Component {
  state = {
    contacts: [], // all contacts, loaded from API
    error: false,
    filters: {
      name: '',
      phone_number: '',
      address: ''
    },
    isLoaded: false,
    sorts: [], // an array of objects { field, direction }
    visibleContacts: [], // filtered contacts
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
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

  handleSort = (field) => {
    const { sorts } = this.state
    console.log(sorts, field)
  }

  render() {
    const { contacts, visibleContacts, filters, error, isLoaded, sorts } = this.state

    const isFilterActive = Object.keys(filters).some(f => filters[f].length > 0)

    return (
      <Container style={{ margin: '1rem' }}>
        <AppTitle />
        <AppNotes />
        <Segment loading={!isLoaded}>
          {error && <Message error>Something went wrong: {error}</Message>}
          {!error && contacts && (
            <>
              <div style={{ display:'flex', width: '100%' }}>
                <AppHeader
                  isFilterActive={isFilterActive}
                  nContacts={contacts.length}
                  nVisibleContacts={visibleContacts.length}
                />
                <div> {/* wrapping div is required so button does not take height of flex parent. */}
                  <Button primary icon="plus" labelPosition="right" content="New contact" />
                </div>
              </div>
              {contacts.length > 0 && (
                <Table selectable stackable size="small" compact>
                  <TableHeader
                    handleFilterChange={this.handleFilterChange}
                    handleSort={this.handleSort}
                    sorts={sorts}
                  />
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
