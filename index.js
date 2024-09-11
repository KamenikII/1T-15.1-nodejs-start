const fs = require("fs");
const path = require("path");
const axios = require("axios");
const http = require("http");

// ex 1
// fs.writeFile('1.txt', 'hello!', 'utf-8', (err) => {
//     if (err) {
//         throw err
//     }
//     console.log('Done')
// })

// //ex 2
// fs.readFile(path.resolve(__dirname, '1.txt'), 'utf-8', (err, data) => {
// // fs.readFile(path.resolve('1.txt'), 'utf-8', (err, data) => {
//     if (err) {
//         throw err
//     }
//     console.log(data)
// })

// ex 3
// ;(async () => {
//     const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     fs.writeFile(path.resolve(__dirname, 'posts.json'), JSON.stringify(data), 'utf-8', (err) => {
//         if (err) {
//             throw err
//         }
//         console.log('Done')
//     })
// })()

// ex 4
// http
//   .createServer((request, response) => {
//     response.setHeader("Content-Type", "text/html; charset=utf-8");
//     if (request.url === "/users") {
//         response.write("List of users");
//     } else if (request.url === "/posts") {
//         response.write("posts");
//     } else {
//         response.write("404");
//     }
//     response.end();
//   })
//   .listen(3000);



//   HW
function getPosts () {
    const { data } = axios.get('https://jsonplaceholder.typicode.com/posts')
    fs.writeFile(path.resolve(__dirname, 'posts.json'), JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            throw err
        }
    })
    return data
    
}

function getUsers () {
    const { data } = axios.get('https://jsonplaceholder.typicode.com/users')
    fs.writeFile(path.resolve(__dirname, 'posts.json'), JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            throw err
        }
    })
    return data
}

function getString (file) {
    fs.readFile(path.resolve(file), 'utf-8', (err, data) => {
        if (err) {
            throw err
        }
        return data
    })
}

http
    .createServer((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.url === '/users') {
            res.write(getString('users.json'))
        } else if (req.url === '/posts') {
            res.write(getString('posts.json'))
        } else {
            res.write('404: Not Found')
        }
        res.end();
    })
    .listen(3000)