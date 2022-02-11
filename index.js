const { urlencoded, json }  = require('express');
const express = require('express');
const Port = 3000;
const app = express();


// view all the books;
// add book
// delete book
//update book details

// book details
/**
 * id
 * title
 * author
 * 
 */


app.use(json());
app.use(urlencoded({ extended: false }));

let bookDatabase = [
{
  id: 1,
  title: "Rich dad poor dad",
  author: "Hammed"
},

  {
    id: 2,
    title: "Think and grow rich",
    author: "Akeem"
  }

];

app.get('/',(req, res) => {
res.json({
  message: "Welcome to Library app"
})
});

// get all books
app.get('/books', (req, res) => {
  res.json({
    status: 'success',
    message: 'successfully fectch all books',
    data: bookDatabase,
  }).status(200);
})

// get single book by id
app.get('/book/:bookId', (req, res) => {
  const {bookId} = req.params;
  const data = bookDatabase.find(book => book.id === Number(bookId));
  if(data){
    res.json({
      status: 'success',
      message: 'successfully fectch a book',
      data: data,
    }).status(200)
  }else{
    res.json({
      status: 'error',
      message: 'Page not found',
    }).status(404)
  }
});


// add new book

app.post('/book', (req, res)=> {
  const { author, title } = req.body;

  bookDatabase.push({
    id: bookDatabase[bookDatabase.length - 1].id + 1,
    title,
    author
  })

  res.json({
    status: 'success',
    message: 'successfully add  new book',
    data: bookDatabase,
  }).status(201);
})

// delete book
app.delete('/book/:bookId', (req, res) => {
  const { bookId } = req.params;
    bookDatabase = bookDatabase.filter(book => book.id !== Number(bookId));
    res.json({
      status: 'success',
      message: 'successfully fectch a book',
      data: bookDatabase,
    }).status(200)
});





app.listen(Port, () => { console.log(`application running on port ${Port}`)});

