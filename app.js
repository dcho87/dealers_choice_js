const express = require("express");
const { rest } = require("lodash");
const app = express();
const books = require("./books")
const morgan = require("morgan")

app.use(morgan('dev'))
app.use(express.static('public'))


app.get("/", (req, res) => {
    
    const posts = books.list();
    
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Amazon's Best Seller 2021 </title>
      <link rel="stylesheet" href="/style.css" />
      <h1> Amazon's Best Seller 2021</h1>
    </head>
    <body>
      <div class="list">
        <ol>
            ${posts.map(post => `<li><a href="/books/${post.id}"> ${post.title}</a> by ${post.author}</li>`).join('')}
        </ol>
      </div>
    </body>
  </html>`

  res.send(html)
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const post = books.find(id);
    res.send(`
    <html>
    <head>
      <title>Amazon's Best Seller 2021 </title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
    <div>
    <img src="/${post.id}.jpg"/>
    <div class="item">
    ${post.title} (by: ${post.author})
    </div>
    <p>
    ${post.about}
    </p>
    </div>
    <div>
    <a href="/"> Home </a>
    </div>
        </body>
    </html>`);

})



const PORT = 1337;

app.listen(PORT, () => {
    console.log('App listening in port')
});