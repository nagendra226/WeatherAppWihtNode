//We'll be using the very popular fetch API that is not part of JavaScript.

//It is a browser based API which means it's something we can use in all modern browsers but it's not

//accessible in node j s so the code we write inside of here isn't going to be something you'll be able

//to use in a back end node script here.

console.log("This is Client JavaScript");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
});

// fetch("http://localhost:3000/weather?address=LasVegas").then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         } else {
//             console.log(data);
//         }
//     });
// });