import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import FilterInput from './FilterInput'

class ColumnHeader extends Component {
  handleSortClick = () => {
    const { field, handleSort } = this.props
    handleSort(field)
  }

  render() {
    const { field, filterValue, handleFilterChange, title, currentSortDirection } = this.props

    let sortIconName
    switch (currentSortDirection) {
      case 'ASC':
        sortIconName = 'sort up'
        break
      case 'DESC':
        sortIconName = 'sort down'
        break
      default:
        sortIconName = 'sort'
    }

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FilterInput
            defaultValue={filterValue}
            field={field}
            onChange={handleFilterChange}
            placeholder={title}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            color={currentSortDirection ? 'green': null}
            name={sortIconName}
            size="large"
            style={{ cursor: 'pointer' }}
            onClick={this.handleSortClick}
          />
        </div>
      </div>
    )
  }
}

ColumnHeader.propTypes = {
  currentSortDirection: PropTypes.oneOf([
    null,
    'ASC',
    'DESC',
  ]),
  field: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
ColumnHeader.defaultProps = {
  currentSortDirection: null,
}

export default ColumnHeader
