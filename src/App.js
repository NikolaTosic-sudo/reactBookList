import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, Input, FormGroup, Label } from 'reactstrap'

class App extends Component {
  state = {
    books: [
      {
        id: 1,
        title: 'Nesto',
        rating: 8.2
      },
      {
        id: 2,
        title: 'Drugo',
        rating: 7.2
      }
    ],
    modal: false,
    editBookModal: false,
    newBookData: {
      id: 0,
      title: '',
      rating: '',
    },
    editBookData: {
      id: '',
      title: '',
      rating: '',
    }
  }

  toggleNewBookModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleEditBookModal(){
    this.setState({
      editBookModal: !this.state.editBookModal
    })
  }

  addBook(){

    this.setState({
      newBookData: {
        ...this.state.newBookData,
   //maybe this is needed, still haven't tested it that much     id: this.state.books.length + 2
      }
    })

    console.log(this.state.newBookData)

    this.state.books.push(this.state.newBookData)

    console.log(this.state.books)

    this.setState({
      modal: false
    })

    this._updateId()
  }

  editBook(id, title, rating) {
    this.setState({
      editBookData: {
        id,
        title,
        rating
      },
      editBookModal: !this.state.editBookModal
    })
  }

  updateBook(){
    let { id, title, rating } = this.state.editBookData

    let newBook = {
      id,
      title,
      rating
    }

    this.state.books.splice(id - 1, 1, newBook)

    this.setState({
      books: this.state.books,
      editBookModal: !this.state.editBookModal
    })

    console.log(this.state.books)
  }

  deleteBook(id) {

    this.state.books.splice(id - 1, 1)

    this.setState({
      books: this.state.books
    })

    console.log(this.state.books)

    this._updateId()
  }

  _updateId() {
    
    this.state.books.map(book => {
      let index = this.state.books.indexOf(book)
      
      return book.id = index + 1
    })
  }

  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.rating}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.title, book.rating)}>Edit</Button>
              <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
            </td>
          </tr>
      )
    })
  return (
    <div className="container">


      <h1>Books App</h1>

      <Button className="my-3" color="danger" onClick={this.toggleNewBookModal.bind(this)}>Add New Book</Button>


      <Modal isOpen={this.state.modal} toggle={this.toggleNewBookModal.bind(this)} className={this.props.className}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.title = e.target.value

              this.setState({
                newBookData
              })
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input id="rating" value={this.state.newBookData.rating} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.rating = parseFloat(e.target.value);

              this.setState({
                newBookData
              })
            }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)} className={this.props.className}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.title = e.target.value

              this.setState({
                editBookData
              })
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input id="rating" value={this.state.editBookData.rating} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.rating = parseFloat(e.target.value);

              this.setState({
                editBookData
              })
            }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Edit Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books}
        </tbody>
      </Table>
    </div>
  );
}}

export default App;
