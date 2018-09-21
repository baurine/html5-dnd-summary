import React from 'react'

import './Draggable.css'

const ITEMS = [
  {id: 1, title: 'A'},
  {id: 2, title: 'B'},
  {id: 3, title: 'C'},
  {id: 4, title: 'D'}
]

export default class Draggable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      draggedId: null
    }
  }

  renderItem = (item) => {
    return (
      <div className='row'
           key={item.id}
           draggable={true}>
           <h1>{item.title}</h1>
      </div>
    )
  }

  render() {
    return (
      <div className='rows'>
        { ITEMS.map(this.renderItem) }
      </div>
    )
  }
}
