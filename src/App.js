import React, { Component } from 'react'
import { Container, Segment, Message, Table, Button } from 'semantic-ui-react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'

import AppHeader from './components/AppHeader'
import AppNotes from './components/AppNotes'
import AppTitle from './components/AppTitle'
import ContactDetailForm from './components/ContactDetailForm'
import ContactRow from './components/ContactRow'
import ColumnHeaders from './components/ColumnHeaders'

class App extends Component {
  state = {
    contacts: [], // all contacts, loaded from API
    error: false,
    filters: {
      name: '',
      address: '',
      phone_number: ''
    },
    isLoaded: false,
    mode: 'list', // 'list', 'add' or 'edit'
    selectedContact: null, // the contact currently being edited
    sorts: [], // [{ field, direction }]. It's an array to support possible future enhancement of sorting by multiple columns.
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

  handleDeleteContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id),
      visibleContacts: state.visibleContacts.filter(c => c.id !== contact.id)
    }))
  }

  handleAddContact = () => {
    this.setState({
      mode: 'add',
    })
  }

  handleEditContact = (contact) => {
    this.setState({
      mode: 'edit',
      selectedContact: contact,
    })
  }

  handleEditCancel = () => {
    this.setState({
      mode: 'list',
      selectedContact: null,
    })
  }

  handleEditSave = () => {
    // TODO
    this.setState({
      mode: 'list',
      selectedContact: null,
    })
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
    this.setState(state => {
      const { sorts } = state
      const currentSort = sorts.find(f => f.field === field)
      let newSort
      if (currentSort) {
        newSort = { field, direction: currentSort.direction === 'ASC' ? 'DESC' : 'ASC'}
      } else {
        newSort = { field, direction: 'DESC'}
      }

      return {
        sorts: [
          newSort,
          // Sorting by multiple columns would work like this, but I'm not implementing it now:
          // Need to think how it works in the UI, that's why it's left out for now
          // ...state.sorts.filter(f => f.field !== field),
        ],
      }
    }, () => {
      const { visibleContacts, sorts } = this.state
      const sortedVisibleContacts = visibleContacts.sort((a, b) => {
        let result = 0
        // Yes I know there's only one item in the sorts array
        sorts.forEach(s => {
          if (s.direction === 'ASC') result = a[s.field] < b[s.field] ? 1 : -1
          if (s.direction === 'DESC') result = a[s.field] > b[s.field] ? 1 : -1
        })
        return result
      })
      this.setState({
        visibleContacts: sortedVisibleContacts,
      })
    })
  }

  render() {
    const {
      contacts, visibleContacts, filters, error,
      selectedContact, isLoaded, sorts, mode,
    } = this.state

    const isFilterActive = Object.keys(filters).some(f => filters[f].length > 0)

    return (
      <Container text style={{ margin: '1rem' }}>
        <AppTitle />
        <AppNotes />
        {error && <Message error>Something went wrong: {error}</Message>}
        {!error && mode === 'list' && (
          <Segment loading={!isLoaded}>
            {contacts && (
              <>
                <div style={{ display:'flex', width: '100%' }}>
                  <AppHeader
                    isFilterActive={isFilterActive}
                    nContacts={contacts.length}
                    nVisibleContacts={visibleContacts.length}
                  />
                  <div> {/* wrapping div is required so button does not take height of flex parent. */}
                    <Button
                      content="New contact"
                      icon="plus"
                      onClick={this.handleAddContact}
                      primary
                      labelPosition="right"
                    />
                  </div>
                </div>
                {contacts.length > 0 && (
                  <Table selectable stackable size="small" compact>
                    <ColumnHeaders
                      filters={filters}
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
                            handleEdit={this.handleEditContact}
                          />
                        ))}
                      </Table.Body>
                    )}
                  </Table>
                )}
              </>
            )}
          </Segment>
        )}
        {!error && mode === 'edit' && (
          <Segment>
            <ContactDetailForm
              contact={selectedContact}
              handleCancel={this.handleEditCancel}
              handleSave={this.handleEditSave}
            />
          </Segment>
        )}
        {!error && mode === 'add' && (
          <Segment>
            <ContactDetailForm
              handleCancel={this.handleEditCancel}
              handleSave={this.handleEditSave}
            />
          </Segment>
        )}
      </Container>
    )
  }
}

export default App
