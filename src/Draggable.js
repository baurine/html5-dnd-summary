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

  getItemClassName = (item) => {
    let className = ['row']
    if (item.id === this.state.draggedId) {
      className.push('in-drag')
    }
    return className.join(' ')
  }

  handleDragStart = (item) => {
    this.setState({draggedId: item.id})
  }
  
  handleDragEnd = () => {
    this.setState({draggedId: null})
  }

  renderItem = (item) => {
    return (
      <div className={this.getItemClassName(item)}
           key={item.id}
           draggable={true}
           onDragStart={()=>this.handleDragStart(item)}
           onDragEnd={this.handleDragEnd}
           >
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
