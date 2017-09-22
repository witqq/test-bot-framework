var loaderUtils = require("loader-utils");
const path = require('path');

module.exports.getCssIdent = (loaderContext, localIdentName, localName, options) => {
    if (!options.context)
        options.context = loaderContext.options && typeof loaderContext.options.context === "string" ? loaderContext.options.context : loaderContext.context;
    var request = path.relative(__dirname, loaderContext.resourcePath);
    options.content = options.hashPrefix + request + "+" + localName;
    localIdentName = localIdentName.replace(/\[local\]/gi, localName);
    var hash = loaderUtils.interpolateName(loaderContext, localIdentName, options);
    return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
}