import React from 'react'
import { List } from 'semantic-ui-react'

const AppNotes = () => (
  <List bulleted>
    <List.Item>By <a href="https://twitter.com/simon_ansell" target="_blank" rel="noopener noreferrer">Simon Ansell</a> for <a href="https://www.hackajob.co" target="_blank" rel="noopener noreferrer">hackajob</a>.</List.Item>
    <List.Item>Type in the inputs to filter (min 3 characters).</List.Item>
    <List.Item>Click the arrows to sort.</List.Item>
    <List.Item>Mouseover a contact row to reveal edit and delete actions, or click on a contact row to edit.</List.Item>
  </List>
)

export default AppNotes
