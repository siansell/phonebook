import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

const AppHeader = ({ nContacts, nVisibleContacts, isFilterActive }) => (
  <Header as="h2" style={{ flex: 1, marginBottom: 0, minHeight: 50 }}>
    {nContacts} contact
    {nContacts !== 1 && 's'}
    <Header.Subheader>
      {isFilterActive ? `(${nVisibleContacts} in filter)` : ''}
    </Header.Subheader>
  </Header>
)

AppHeader.propTypes = {
  isFilterActive: PropTypes.bool.isRequired,
  nContacts: PropTypes.number.isRequired,
  nVisibleContacts: PropTypes.number.isRequired,
}

export default AppHeader
