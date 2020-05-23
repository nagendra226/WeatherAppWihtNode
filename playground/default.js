const greeter = (name="No Name") => {
    console.log("Hello " + name);
}

greeter("Nagendra");
greeter();

const product = {
    label:"Red Notebook",
    price:3,
    stock:201,
    salePrice:undefined,
    rating:4.2
}

const transaction = (type, {label,price = 0} = {}) => {
    console.log(type,label,price)
}

transaction("order",product);

//transaction("order"); we get error

transaction("order");