/////////////////////////////////////// SERVER 2//////////////////////////////
// CORE MODULES
const fs = require("fs");
const http = require("http");
const url = require("url");

// 3RD PARTY MODULES

// PERSONAL MODULES
const replaceTemplate = require("./modules/replaceTemplate");

// REPLACE TEMPLATE VALUES FROM THE MAP DATA
// const replaceTemplate = (temp, product) => {
//   let output = temp.replaceAll("{%PRODUCT_NAME%}", product.productName);
//   output = output.replaceAll("{%PRODUCT_IMAGE%}", product.image);
//   output = output.replaceAll("{%PRODUCT_PRICE%}", product.price);
//   output = output.replaceAll("{%PRODUCT_COUNTRY%}", product.from);
//   output = output.replaceAll("{%PRODUCT_NUTRIENTS%}", product.nutrients);
//   output = output.replaceAll("{%PRODUCT_QUANTITY%}", product.quantity);
//   output = output.replaceAll("{%PRODUCT_DESCRIPTION%}", product.description);
//   output = output.replaceAll("{%PRODUCT_ID%}", product.id);

//   if (!product.organic)
//     output = output.replaceAll("{%PRODUCT_TYPE%}", "not-organic");
//   return output;
// }; // FUNCTION WAS LATER CONVERTED INTO A PERSONAL MODULE

// Blocking, synchronous way
const overview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const card = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const product = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); //Using this method, which is the sync method is not a problem here, because, once the program starts, it is only ran once, it is not going to be run again except the the program retarts. So no matter how many times a user calls a the server with the /api path, it will not get run since it is not in the server callback
const dataObj = JSON.parse(data);
// console.log(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
  // const pathName = req.url; //the pathname on the url on the browser, DO THIS BELOW INSTEAD
  const { query, pathname } = url.parse(req.url, true);

  //   ROUTING 2
  //   OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = dataObj.map((el) => replaceTemplate(card, el)).join(""); // THE Map array method reads the dataObj which is now a javascript array, there by reading each element, it calls a function replaceTemplate(card, el) which parameters were given as the read card file and the element at which the map method is currently on, the function runs for each element that is passed to it and return the element which will be then put into an array afterwhich, the array is joined using the join method

    const output = overview.replace("{%PRODUCTS%}", cardsHtml);
    res.end(output); //The output variable was then created, thereby overview.replace was called to replace the cardsHtml)

    //   PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const productData = dataObj[query.id];
    const output = replaceTemplate(product, productData);
    // console.log(output);
    // res.end(output); //
    res.end(output);

    // API PAGE
  } else if (pathname === "/api") {
    // console.log(data);
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    // res.end(JSON.stringify(dataObj));

    // NOT FOUND PAGE
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND!</h1>");
  }
});

server.listen(process.env.PORT, () => {
  console.log(`The server has begun running on ${process.env.PORT}`);
});
