import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import FilterInput from './FilterInput'

class ColumnHeader extends Component {
  render() {
    const { field, handleFilterChange, title } = this.props

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FilterInput
            field={field}
            onChange={handleFilterChange}
            placeholder={title}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name="sort" size="large" />
        </div>
      </div>
    )
  }
}

ColumnHeader.propTypes = {
  field: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ColumnHeader
