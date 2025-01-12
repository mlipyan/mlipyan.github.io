const ftp = require("basic-ftp") 
// ESM: import * as ftp from "basic-ftp"


async function uploadData() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "files.000webhost.com",
            user: "spanish314",
            password: "Witten1$",
            secure: true
        })
        //console.log(await client.list());
        await client.uploadFrom("data.js", "./public_html/data.js");
        await client.uploadFrom("prob.html", "./public_html/prob.html");
        //await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

module.exports = {uploadData};