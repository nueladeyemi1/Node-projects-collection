const fs = require('fs')

const http = require('http')

const url = require('url')

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

// 1. CREATE SERVER
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)

  //   output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic)
    output = output.replace(/{%NON_ORGANIC%}/g, 'not-organic')

  return output
}

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
  //   console.log(req.url)
  const pathName = req.url

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
    res.end('This is product')

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

server.listen(8000, '127.0.0.2', () => {
  console.log('Listening to request on port 8000')
})
