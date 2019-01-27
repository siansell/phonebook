import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

class FilterInput extends Component {
  handleChange = (e, { value }) => {
    const { field, onChange } = this.props
    onChange(field, value)
  }

  render() {
    const { placeholder } = this.props
    return <Input size="small" placeholder={placeholder} onChange={this.handleChange} />
  }
}

FilterInput.propTypes = {
  field: PropTypes.oneOf([
    'name',
    'address',
    'phone_number',
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default FilterInput
