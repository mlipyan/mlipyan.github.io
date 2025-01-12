const fs = require('fs');
const ftp = require("basic-ftp") 

let {dataList} = require('./data_node.js');
//console.log(dataList);
//var socket = io();

function addContect(entry, definition, vocab, _utc){
return '{entry: \'' + entry + '\', definition:\'' + definition  + '\', utc:' + _utc 
          + ', type:\''  + vocab  + '\'},\n'
};

function writeContent(data){
  dataList.push(data); 
  console.log(data);

  let content = 'const dataList = [\n';
  dataList.forEach(x => {content +=  addContect(x.entry, x.definition, x.type, x.utc)});

  fs.writeFileSync('data_node.js', content + ']; module.exports = {dataList};', err => {
    if (err) {console.error(err); }
  });
  fs.writeFileSync('data.js', content + '];', err => {
      if (err) {console.error(err);}
    });
  return data.entry;
};

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
    client.close();    
}

module.exports = {writeContent, uploadData};