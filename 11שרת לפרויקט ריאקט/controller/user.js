
const fs = require('fs');


function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

exports.login = (req, res) => {
    console.log('hi')
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let user = req.body
            console.log(user.email,user.password)
            data = JSON.parse(data);
            let currentUser = data.find(st => st.password === user.password)
            if (currentUser == undefined || currentUser.email != user.email) {
                res.status(401).send("user isn't exist!, please register");
            } else {
                res.status(200).send(currentUser);
            }
        }
    })
}
exports.put = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).send("Error reading file");
        }

        let id = req.params.id;
        let users;

        try {
            users = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing JSON data:", parseErr);
            return res.status(500).send("Error parsing JSON data");
        }

        let index = users.findIndex(user => user.id == id);
        
        if (index === -1) {
            return res.status(404).send("Product not found");
        }

        let updateduser = req.body;
        console.log(updateduser)

        // Log the received updatedProduct to debug
        console.log("Updated user:", updateduser);

        // Replace the existing product with the updated product
        users[index] = { ...updateduser, id: id };

        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error updating user");
            } else {
                res.send(users[index]);
            }
        });
    });
};


exports.post = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {

        if (err) {

            res.status(500).send("Error reading users file");

            return;

        }

        debugger;

        let users = JSON.parse(data);

        let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        

        req.body.id = newId;

        users.push(req.body);

        fs.writeFile("users.json", JSON.stringify(users), (err) => {

            if (err) {

                res.status(500).send("Error in adding user");

            } else {

                res.send(req.body);

            }

        });

    });

}

//אפשרות שניה ליצא פונקציה מדף

exports.get = get;