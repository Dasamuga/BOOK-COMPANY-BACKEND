//MAIN BACKEND FILE 
//this is fun
const db= require("./database");


const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://thanushan_vijay:thanu123@cluster0.gepvd.mongodb.net/book-company?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//client.connect(err => {
  //const bcollection = client.db("book-company").collection("books");
  //console.log(bcollection);
  // perform actions on the collection object
  //client.close();
//});
async function listDatabases(client){
    databaselist = await client.db().admin().listDatabases();
    console.log("THE DATABASES ARE:");
    databaselist.databases.forEach(db=>console.log(db.name));

}
async function main(){
    const uri = "mongodb+srv://thanushan_vijay:thanu123@cluster0.gepvd.mongodb.net/book-company?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try{
        await client.connect();
        await listDatabases(client);

    }
    catch(err){

        console.log(err);
    }
    finally{
        await client.close();
    }
}
main();



//http://localhost:3000/books
app.get("/books",(req,res)=>{
    const getallbooks= db.books
    return res.send(getallbooks);
});


app.get("/book/:isbn",(req,res)=>{//set request and response and set url
    //console.log(req.params);
    const {isbn} = req.params;
    //console.log(isbn);
    const getspesificBooks = db.books.filter((book) => book.ISBN ===isbn);
    //console.log(getspesificBooks);
    //console.log(getspesificBooks.length);
    if(getspesificBooks.length===0){
        return res.send({"error": 'No Book Foud For the ISBN of ${isbn}'});
    }
    return res.send(getspesificBooks[0]);
});


app.get("/book-category/:category",(req,res)=>{//set request and response and set url
    //console.log(req.params);
    const {Category} = req.params;
    //console.log(isbn);
    const getspesificBooks = db.books.filter((book) => book.category.includes(Category));
    //console.log(getspesificBooks);
    //console.log(getspesificBooks.length);
    if(getspesificBooks.length===0){
        return res.send({"error": 'No Book Foud For the ISBN of ${Category}'});
    }
    return res.send(getspesificBooks[0]);
});


app.get("/authers",(req,res)=>{
    const getallAuthers = db.authers;
    return res.send(getallAuthers);
});


app.get("/auther/:ID",(req,res)=>{//set request and response and set url
    //console.log(req.params);
    let {ID} = req.params;
    ID=Number(ID);
    //console.log(isbn);
    const getspesificAuther = db.authers.filter((auther) => auther.id === ID);
    //console.log(getspesificBooks);
    //console.log(getspesificBooks.length);
    if(getspesificAuther.length===0){
        return res.json({"error": 'No Auther Foud For the ${ID}'});
    }
    return res.json(getspesificAuther[0]);
});


//http://loaclhost:3000/auther/1234ONE

app.get("/auther-isbn/:isbn",(req,res)=>{//set request and response and set url
    //console.log(req.params);
    const {isbn} = req.params;
    //console.log(isbn);
    const getspesificAutherforwrittingBook = db.authers.filter((auther) => auther.books.includes(isbn));
    //console.log(getspesificBooks);
    //console.log(getspesificBooks.length);
    if(getspesificAutherforwrittingBook.length===0){
        return res.send({"error": 'No Book Foud For the Auther ISBN of ${isbn}'});
    }
    return res.send(getspesificAutherforwrittingBook[0]);
});

//POST METHODS (create)///////

//http://localhost:3000/book

app.post("/book",(req,res)=>{
    console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books);
});


//http://localhost:3000/Auther

app.post("/Auther",(req,res)=>{
    console.log(req.body);
    db.authers.push(req.body);
    return res.json(db.authers);
});


//http://localhost:3000/Publications

app.post("/Publications",(req,res)=>{
    console.log(req.body);
    db.Publications.push(req.body);
    return res.json(db.Publications);
});





//PUT (UPDATE) Methods 

//http://localhost:3000/book-update/1234ONE

app.put("/book-update/:isbn",(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book)=>{
        if(book.ISBN===isbn){
            console.log(book);
            return {...book,...req.body};
        }
        return book;
    })
    return res.json(db.books);
});


//http://localhost:3000/auther-update/1

app.put("/auther-update/:id",(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    const {id} = req.params;
    db.books.forEach((auther)=>{
        if(auther.id===id){
            console.log(auther);
            return {...auther,...req.body};
        }
        return auther;
    })
    return res.json(db.authers);
});


//http://localhost:3000/publication-update/1
//app.put("/publication-update/:id",(req,res)=>{

//});


//DELETE Methods


//http://localhost:3000/book-delete/1234ONE

app.delete("/book-delete/:isbn",(req,res)=>{
    console.log(req.params);
    const {isbn}=req.params;
    const deletebook = db.books.filter((book) => book.ISBN!==isbn);
    console.log(deletebook);
    db.books=deletebook;
    return res.json(db.books);
});


//http://localhost:3000/book-auther-delete/1234ONE/1
app.delete("/book-auther-delete/:isbn/:id",(req,res)=>{
    let {isbn,id}=req.params;
    id=Number(id);
    db.books.forEach((book)=>{
        if(book.ISBN===isbn){
            if(!book.authers.includes(id)){
                return;
            }
            book.authers=book.authers.filter((auther)=> auther!==id);
            return book;
        }
        return book;
    })
    return res.json(db.books);
});


app.listen(3000,()=>{
    console.log("MY EXPRESS APP IS RUNNING.....");
});