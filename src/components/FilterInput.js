import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

class FilterInput extends Component {
  handleChange = (e, { value }) => {
    const { field, onChange } = this.props
    onChange(field, value)
  }

  render() {
    const { defaultValue, placeholder } = this.props
    return (
      <Input
        defaultValue={defaultValue}
        fluid
        onChange={this.handleChange}
        placeholder={placeholder}
        size="small"
      />
    )
  }
}

FilterInput.propTypes = {
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default FilterInput
