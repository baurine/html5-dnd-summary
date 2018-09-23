import React from 'react'

import './Draggable.css'

const initialData = {
  items: {
    '1': {id: 1, title: 'A'},
    '2': {id: 2, title: 'B'},
    '3': {id: 3, title: 'C'},
    '4': {id: 4, title: 'D'}
  },
  item_ids: ['1','2','3','4']
}

export default class Draggable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: initialData,

      draggedId: null,
      draggedIndex: null,
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

  handleDragStart = (e, item, index) => {
    console.log('drag start:', item.title)
    this.setState({draggedId: item.id, draggedIndex: index})
    // make it work in firefox
    e.nativeEvent.dataTransfer.setData('text/plain', 'https://www.google.com')
    e.nativeEvent.dataTransfer.effectAllowed = 'copy'
  }

  handleDrag = (e, item) => {
    // console.log('drag:', item.id)
  }

  handleDragEnd = (e, item) => {
    console.log('drag end:', item.title)
    this.setState({draggedId: null, draggedIndex: null, dragOverId: null})
  }

  handleDragEnter = (e, item) => {
    console.log('drag enter:', item.title)
    this.setState({dragOverId: item.id})
  }

  handleDragOver = (e, item) => {
    console.log('drag over:', item.title)
    // necessary, else onDrop won't be called
    e.preventDefault()
    e.nativeEvent.dataTransfer.dropEffect = 'copy'
  }

  handleDragExit = (e, item) => {
    // called in firefox
    console.log('drag exit:', item.title)
  }

  handleDragLeave = (e, item) => {
    console.log('drag leave:', item.title)
    // in practical, we don't need to handle this, we'll do it in onDrop or onDragEnd
    // this.setState({dragOverId: null})
  }

  handleDrop = (e, item, index) => {
    console.log('drop:', item.title)
    console.log(e.nativeEvent.dataTransfer)
    // for firefox, stop opening link automatically
    e.preventDefault()

    if (this.state.draggedIndex !== null && index !== this.state.draggedIndex) {
      // swap
      let newItemIds = Array.from(this.state.data.item_ids)
      newItemIds[index] = this.state.draggedId
      newItemIds[this.state.draggedIndex] = item.id
      const newState = {
        ...this.state,
        data: {
          ...this.state.data,
          item_ids: newItemIds
        }
      }
      this.setState(newState)
    }
  }

  renderItem = (item_id, index) => {
    const item = this.state.data.items[item_id]
    return (
      <div className={this.getItemClassName(item)}
           key={item.id}
           draggable={true}

           onDragStart={(e)=>this.handleDragStart(e, item, index)}
           onDrag={(e)=>this.handleDrag(e, item)}
           onDragEnd={(e)=>this.handleDragEnd(e, item)}

           onDragEnter={(e)=>this.handleDragEnter(e, item)}
           onDragOver={(e)=>this.handleDragOver(e, item)}
           onDragExit={(e)=>this.handleDragExit(e, item)}
           onDragLeave={(e)=>this.handleDragLeave(e, item)}
           onDrop={(e)=>this.handleDrop(e, item, index)}>
        <h1>{item.title}</h1>
      </div>
    )
  }

  render() {
    return (
      <div className='rows'>
        { this.state.data.item_ids.map(this.renderItem) }
      </div>
    )
  }
}
