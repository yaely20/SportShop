
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}
exports.delete = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {

        let id = req.params.id

        let products = JSON.parse(data);

        let newArrProduct = products.filter(i => i.id != id)

        fs.writeFile("products.json", JSON.stringify(newArrProduct), (err) => {

            if (err) {

                res.status(500).send("error  in add products ");

            } else {

                res.send(newArrProduct);

            }

        })

    })

}

exports.post = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {

        if (err) {

            res.status(500).send("Error reading product file");

            return;

        }
        let products = JSON.parse(data);

        let newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const { path: image } = req.file;
        req.body.id = newId;
        req.body.isOnSale = false;
        req.body.imgUrl = image.replace('\\', '/');

        products.push(req.body);

        fs.writeFile("products.json", JSON.stringify(products), (err) => {

            if (err) {

                res.status(500).send("Error in adding product");

            } else {

                res.send(req.body);

            }

        });

    });

}

exports.put = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        let id = req.params.id;
        let products;

        try {
            products = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing JSON data:", parseErr);
            return res.status(500).send("Error parsing JSON data");
        }

        let index = products.findIndex(product => product.id == id);
        let img = products[index].imgUrl

        if (index === -1) {
            return res.status(404).send("Product not found");
        }

        let updatedProduct = req.body;
        console.log(updatedProduct)

        // Log the received updatedProduct to debug
        console.log("Updated product:", updatedProduct);

        // Replace the existing product with the updated product
        updatedProduct.imgUrl=img;
        products[index] = { ...updatedProduct, id: id };

        fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error updating product");
            } else {
                res.send(products[index]);
            }
        });
    });
};
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
