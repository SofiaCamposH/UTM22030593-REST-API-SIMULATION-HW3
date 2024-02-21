import { readJson, updateJson } from "./fileUtils.js";

const sendReponse =(code, body = null) => {
    const response = {
      code,
      body,
    };
  
    switch (code) {
      case 200:
        response.msg = "Ok";
        break;
      case 201:
        response.msg = "Done";
        break;
      case 301:
        response.msg = "Moved";
        break;
      case 400:
        response.msg = "Endpoint not valid";
        break;
      case 404:
        response.msg = "Not found";
        break;
      case 500:
        response.msg = "Internal Server Error";
        break;
      default:
        response.msg = "Unknown status code";
    }
  
    return response;
  };




const updateBookTitle = (isbn, title) => {
  try {
    const books = readJson("books-test.json");
    let updatedBook;
    const newBooks = books.map((book) => {
      if (book.ISBN === isbn) {
        updatedBook = { ...book, title };
        return updatedBook;
      }

      return book;
    });

    updateJson("books-test.json", newBooks);
    return updatedBook;
  } catch (error) {
    console.error(error);
  }
};


// Function to simulate a GET request for a book by title or ISBN
const getBook = (titleOrISBN) => {
  try {
    const books = readJson("books-test.json");
    const book = books.find((book) => book.title === titleOrISBN || book.ISBN === titleOrISBN);
    if (book) {
        return sendReponse(200, book);
    } 
    if(!titleOrISBN) {
        return sendReponse(400);
    }
    return sendReponse(404);
    
  } catch (error) {
    return sendReponse(500, error);
  }
};


//Return all exisisitng books
const getBooks = (arrayName) => {
    try {
        const books = readFile("books-test.json");
        if (arrayName === "books") {
            return sendReponse(200, "The existing books are: " + books.map (book => book.title).join(", "));
        }
        if(!arrayName) {
            return sendReponse(400);
        }
        return sendReponse(404);
        
    } catch (error) {
        return sendReponse(500, error);
    }
};


// Function to add a new book to the books array
const addBook = (title, ISBN, year, genre, author, stock, publisher) => {
    const books = readJson("books-test.json");
    const newBook = {
        "title": title,
        "ISBN": ISBN,
        "year": year,
        "genre": genre,
        "author": author,
        "stock": stock,
        "publisher": publisher,
    };
    try {
        if (title, ISBN, year, genre, author, stock, publisher) {
            const newBooks = [...books, newBook];
            updateJson("books-test.json", newBooks);
            return sendReponse(201, newBooks);
        }
        return sendReponse(400);
    
    } catch (error) {
        return sendReponse(500, error);
    }
};


// Function to remove a book by title or ISBN
const removeBookByTitleOrISBN = (titleOrISBN) => {
    const books = readJson("books-test.json");
    const book = books.find((book) => book.title === titleOrISBN || book.ISBN === titleOrISBN);
    try {
        if(book){
            const bookIndex = books.indexOf(book);
            const deletedBook = books.splice(bookIndex, 1);
            const newBooks = [...books, deletedBook];
            updateJson("books-test.json", newBooks);
            return sendReponse(201, newBooks);
        }
        if(!titleOrISBN) {
            return sendReponse(400);
        }
        return sendReponse(404);
    }catch (error) {
        return sendReponse(500, error);
    }
 };



// Function to filter books by a property and value
const filterBy = (property, search) => {
    try{
        const books = readJson("books-test.json");
        if (property && search){
            if (property === "genre"){
                let filter = books.filter(book => book.genre === search);
                return sendReponse(200, filter);
            } else if (property === "author"){
                let filter = books.filter(book => book.author === search);
                return sendReponse(200, filter);
            } else if (property === "publisher"){
                let filter = books.filter(book => book.publisher === search);
                return sendReponse(200, filter);
            }

        }

        if(!property || !search) {
             return sendReponse(400);
        }
        return sendReponse(404);

    }catch (error) {
        return sendReponse(500, error);
    }
};


  // Function to list all books in the specified format
  const listBooks = (arrayName) => {
    try {
        const books = readJson("books-test.json");
        if (arrayName === "books"){
            return sendReponse(200, books.map (book => book.title + " - " + book.author + " - " + book.year).join(", "));
        }
        if(!arrayName) {
            return sendReponse(400);
        }
        return sendReponse(404);
        
    }catch (error) {
        return sendReponse(500, error);
    }
};


// Function to get books by year
const getBooksByYear = (year) => {
    try{
        const books = readJson("books-test.json");
        if(year){
            const filter = books.filter(book => book.year === year);
            return sendReponse(200, filter);
        }
        if(!year) {
            return sendReponse(400);
        }
        return sendReponse(404);
    }catch (error) {
        return sendReponse(500, error);
    }
};

//return true or false if at least ONE book from a given genre has stock availability.
const genreFullAvailability = (genre) => {
    const books = readJson("books-test.json");
    const booksGenre = books.find((book) => book.genre === genre);
    try{
        if (booksGenre !== undefined){
            let filter = books.filter(book => book.genre === genre);
            let stock = filter.every((book) => book.stock > 0);
            return sendReponse(200, stock);
        }
        if(!genre) {
            return sendReponse(400);
        }
        if (booksGenre == undefined){
            return sendReponse(404);
        }
    
    }catch (error) {
        return sendReponse(500, error);
    }
};


//return true or false if at least ONE book from a given genre has stock availability.
const genrePartialAvailability = (genre) =>{
    const books = readJson("books-test.json");
    const booksGenre = books.find((book) => book.genre === genre);
    try{
        if (booksGenre !== undefined){
            let filter = books.filter(book => book.genre === genre);
            let stock = filter.some((book) => book.stock > 0);
            return sendReponse(200, stock);
        }
        if(!genre) {
            return sendReponse(400);
        }
        if (booksGenre == undefined){
            return sendReponse(404);
        }
    
    }catch (error) {
        return sendReponse(500, error);
    }
};


//the first param will be the counting property (genre, author, or publisher),you must return a new object with the name of the property that you are counting andthe counter.

const getCountBy = (property) =>{
    try{
        const books = readJson("books-test.json");
        if (property){
            if (property === "Genre"){
                let counter = books.reduce((acc, book) => {
                    acc[book.genre] = (acc[book.genre] || 0) + 1;
                    return acc;
                }, {});
                return sendReponse(200, counter);
            } else if (property === "Author"){
                let counter = books.reduce((acc, book) => {
                    acc[book.author] = (acc[book.author] || 0) + 1;
                    return acc;
                }, {});
                return sendReponse(200, counter);
            } else if (property === "Publisher"){
                let counter = books.reduce((acc, book) => {
                    acc[book.publisher] = (acc[book.publisher] || 0) + 1;
                    return acc;
                }, {});
                return sendReponse(200, counter);
            }
        }
        if(!property) {
            return sendReponse(400);
        }
        return sendReponse(404);
    }catch (error) {
        return sendReponse(500, error);
    }

};


function main() {
  const args = process.argv.slice(2);

  const endpoint = args[0];

  switch (endpoint) {
    case "updateBookTitle":
      const isbn = args[1];
      const newtitle = args[2];
      console.log(updateBookTitle(isbn, title));
      break;
    case "getBook":
      const titleOrISBN = args[1];
      console.log(getBook(titleOrISBN));
      break;
    case "getBooks":
      const arrayName = args[1];
      console.log(getBooks(arrayName));
      break;
    case "addBook":
      const addBooktitle = args[1];
      const addBookISBN = args[2];
      const addBookyear = args[3];
      const addBookgenre = args[4];
      const addBookauthor = args[5];
      const addBookstock = args[6];
      const addBookpublisher = args[7];
      console.log(addBook(title, ISBN, year, genre, author, stock, publisher));
      break;
    case "removeBookByTitleOrISBN":
        const titleOrISBNr = args[1];
        console.log(removeBookByTitleOrISBN(titleOrISBNr));
        break;
    case "filterBy":
        const filterByProperty = args[1];
        const filterBySearch = args[2];
        console.log(filterBy(filterByProperty, filterBySearch));
        break;
    case "listBooks":
        const listBooksArray = args[1];
        console.log(listBooks(listBooksArray));
        break;
    case "getBooksByYear":
        const year = args[1];
        console.log(getBooksByYear(year));
        break;
    case "genreFullAvailability":  
        const genre = args[1];
        console.log(genreFullAvailability(genre));
        break;
    case "genrePartialAvailability":
        const genrePartial = args[1];
        console.log(genrePartialAvailability(genrePartial));
        break;
    case "getCountBy":
        const getCountByProperty = args[1];
        console.log(getCountBy(getCountByProperty));
        break;
    default:
      console.log("Endpoint not valid");
  }
}

main();