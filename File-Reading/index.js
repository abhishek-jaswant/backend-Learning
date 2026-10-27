const fs = require('fs');


const  readfiledata = async () => {
    try {
        const data = await fs.promises.readFile("data.txt", "utf8");
        console.log(data);
    } catch (err) {
        console.log(err.message);
    }
};




const appendFile = async () => {
    const text = "This is Appended data.";

    try {
        await fs.promises.appendFile("data.txt", text, "utf8");
        console.log("Data appended successfully");
    } catch (err) {
        console.log(err.message);
    }
};

readfiledata();
appendFile();
readfiledata();



