const fs = require('fs');

function mergeValues(values, content) {
  //Cycle over the keys
  for (let key in values) {
    //replace all {{key}} with the value from the values object
    content = content.replace('{{' + key + '}}', values[key]);
  }

  // return merged content
  return content;
}

function view(templateName, values, response) {
  //Read from the template files

  let fileContents = fs.readFileSync(`./views/${templateName}.html`, {
    encoding: 'utf8',
  });

  //Insert values into content
  fileContents = mergeValues(values, fileContents);
  //Write out the contents to the response
  response.write(fileContents);
}

module.exports.view = view;
