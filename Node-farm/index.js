const fs = require('fs')

const http = require('http')

const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')

// BLOCKING SYNCHONOUS WAY

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')

// console.log(textIn)

// const textOut = `This is what we know about the Avacado: ${textIn}`

// fs.writeFileSync('./txt/output.txt', textOut)

// console.log('File written successfully!')

// NON-BLOCKING ASYNCHRONOUS WAY

// fs.readFile('./txt/start.txt', 'utf-8', (error, data) => {
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (error1, data1) => {
//     console.log(data1)
//     fs.readFile('./txt/append.txt', 'utf-8', (error2, data3) => {
//       console.log(data3)

//       fs.writeFile('./txt/final.txt', `${data1}\n${data3}`, (error4, data4) => {
//         console.log('You file has been written sucessfully 🙂')
//       })
//     })
//   })
// })

///////SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true)
  //   console.log(req.url)
  // const pathName = req.url

  //OVERVIEW
  if (pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('')

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

    res.end(output)

    //PRODUCT PAGE
  } else if (pathName === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    })

    const product = dataObj[query.id]

    const output = replaceTemplate(tempProduct, product)

    res.end(output)

    //API
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)

    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000')
})
