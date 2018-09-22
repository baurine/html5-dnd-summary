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
      draggedId: null,
      dragOverId: null,
    }
  }

  getItemClassName = (item) => {
    let className = ['row']
    if (item.id === this.state.draggedId) {
      className.push('in-drag')
    }
    if (item.id === this.state.dragOverId) {
      className.push('drag-over')
    }
    return className.join(' ')
  }

  handleDragStart = (e, item) => {
    console.log('drag start', item.id)
    this.setState({draggedId: item.id})
    // make it work in firefox
    e.nativeEvent.dataTransfer.setData('text', 'anything')
  }

  handleDrag = (e, item) => {
    // console.log('drag', item.id)
  }

  handleDragEnd = (e, item) => {
    console.log('drag end', item.id)
    // in practical, we don't need to handle this, we'll do it in onDrop
    this.setState({draggedId: null, dragOverId: null})
  }

  handleDragEnter = (e, item) => {
    console.log('drag enter', item.id)
    this.setState({dragOverId: item.id})
  }

  handleDragOver = (e, item) => {
    console.log('drag over', item.id)
    // necessary, else onDrop won't be called
    e.preventDefault()
  }

  handleDragExit = (e, item) => {
    // called in firefox
    console.log('drag exit', item.id)
  }

  handleDragLeave = (e, item) => {
    console.log('drag leave', item.id)
    // in practical, we don't need to handle this, we'll do it in onDrop or onDragEnd
    // this.setState({dragOverId: null})
  }

  handleDrop = (e, item) => {
    console.log('drop', item.id)
    // for firefox, stop opening link automatically
    e.preventDefault()
    e.stopPropagation()
  }

  renderItem = (item) => {
    return (
      <div className={this.getItemClassName(item)}
           key={item.id}
           draggable={true}

           onDragStart={(e)=>this.handleDragStart(e, item)}
           onDrag={(e)=>this.handleDrag(e, item)}
           onDragEnd={(e)=>this.handleDragEnd(e, item)}

           onDragEnter={(e)=>this.handleDragEnter(e, item)}
           onDragOver={(e)=>this.handleDragOver(e, item)}
           onDragExit={(e)=>this.handleDragExit(e, item)}
           onDragLeave={(e)=>this.handleDragLeave(e, item)}
           onDrop={(e)=>this.handleDrop(e, item)}>
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
