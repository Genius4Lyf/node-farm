// BLOCKING - SYNCHRONOUS
const fs = require("fs"); //NODE MODULE FOR READING INTO A FILE IN THE SYSTEM
const http = require("http");
const url = require("url");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

//NON BLOCING - ASYNCHRONOUS
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR!");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log;
//       });
//     });
//   });
// });

console.log("will write file");

// SERVER
// Example 1
console.log("THIS IS THE SERVER RUNNING");
// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   //   ROUTING
//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the OVERVIEW");
//   } else if (pathName === "/product") {
//     res.end("This is the PRODUCT");
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//     });
//     res.end("<h1>PAGE NOT FOUND!</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to requests on port 8000");
// });

// Example 2
////////////////////////////////////////// SERVER ONE/////////////////////////////////////////////
// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   //   ROUTING
//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the OVERVIEW");
//   } else if (pathName === "/product") {
//     res.end("This is the PRODUCT");
//   } else if (pathName === "/api") {
//     fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
//       const productData = JSON.parse(data);
//       res.writeHead(200, {
//         "content-type: ": "application/json",
//       });
//       res.end(data);
//     });  //when the code is ran this way, it then means each time the user call for the url, the file will be read, which is not a good idea, so we can correct that in the next server
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//     });
//     res.end("<h1>PAGE NOT FOUND!</h1>");
//   }
// });

/////////////////////////////////////// SERVER 2//////////////////////////////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); //Using this method, which is the sync method is not a problem here, because, once the program starts, it is only ran once, it is not going to be run again except the the program retarts. So no matter how many times a user calls a the server with the /api path, it will not get run since it is not in the server callback
const dataObj = JSON.parse(data);
// console.log(data);
// console.log(dataObj);

const server2 = http.createServer((req, res) => {
  const pathName = req.url; //the pathname on the url on the browser

  //   ROUTING 2
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    // console.log(data);
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(JSON.stringify(dataObj));
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND!</h1>");
  }
});

server2.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
