//Uploadcare browser policy

BrowserPolicy.content.allowOriginForAll('*.ucarecdn.com');
BrowserPolicy.content.allowEval('https://ucarecdn.com');
BrowserPolicy.content.allowScriptOrigin('https://ucarecdn.com');

//Blob URLS (camera)
BrowserPolicy.content.allowImageOrigin("blob:");
var constructedCsp = BrowserPolicy.content._constructCsp();
BrowserPolicy.content.setPolicy(constructedCsp +" media-src blob:;");
