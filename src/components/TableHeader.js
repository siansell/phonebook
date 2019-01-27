import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import ColumnHeader from './ColumnHeader'

const TableHeader = ({ handleSort, handleFilterChange, sorts }) => {
  const nameSort = sorts.find(s => s.field === 'name')
  const nameSortDirection = nameSort ? nameSort.direction : null
  const phoneSort = sorts.find(s => s.field === 'phone_number')
  const phoneSortDirection = phoneSort ? phoneSort.direction : null
  const addressSort = sorts.find(s => s.field === 'address')
  const addressSortDirection = addressSort ? addressSort.direction : null

  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={3}>
          <ColumnHeader
            currentSortDirection={nameSortDirection}
            field="name"
            handleFilterChange={handleFilterChange}
            handleSort={handleSort}
            title="Name"
          />
        </Table.HeaderCell>
        <Table.HeaderCell width={2}>
          <ColumnHeader
            currentSortDirection={phoneSortDirection}
            field="phone_number"
            handleFilterChange={handleFilterChange}
            handleSort={handleSort}
            title="Phone"
          />
        </Table.HeaderCell>
        <Table.HeaderCell width={5}>
          <ColumnHeader
            currentSortDirection={addressSortDirection}
            field="address"
            handleFilterChange={handleFilterChange}
            handleSort={handleSort}
            title="Address"
          />
        </Table.HeaderCell>
        <Table.HeaderCell width={1}>&nbsp;</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

TableHeader.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  sorts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TableHeader
