module.exports.parseString = function(pattern, data, missingKeyString=''){
    if(pattern==undefined || !(typeof pattern === 'string' || pattern instanceof String)){
        return "";
    }
    var myString = pattern;
    var myRegexp = /(?:\${[a-zA-Z0-9-_]+})/g;

    let match = null;
    const variables = [];
    while ( match = myRegexp.exec(myString)) {
        const variable = match[0].substring(match[0].indexOf("{")+1,match[0].lastIndexOf("}"));
        variables.push(variable);
    }

    let result = pattern;
    variables.forEach(variable=>{
        let replacement = missingKeyString;
        if(data.hasOwnProperty(variable)){
            replacement = data[variable];
        }
        result = result.replace(`\$\{${variable}\}`,replacement);
    });
    return result;
};