# Small Joys: Meteor Uploadcare

A little package that adds Uploadcare to Meteor, and gives you some methods for storage and removal.

Note: This package is developed for the <a href="http://smalljoys.co">Small Joys</a> workflow. If you require something a little lighter, we recommend <a href="https://github.com/nate-strauser/meteor-uploadcare-plus/">Nate Strauser's package</a>.


### Add the package to your project

``` js
meteor add smalljoys:uploadcare
```

### Add your Uploadcare API keys

To use <a href="https://uploadcare.com/">Uploadcare</a> you'll need an account (free up to 500 uploads a month). Once you've set up a project you'll have two keys, one public, one secret. Just add them to your Meteor settings like this:

``` js
{
  "public": {
    "uploadcare": {
      "publickey": "********************"
    }
  },
  "private": {
    "uploadcare": {
      "secretkey": "********************"
    }
  }
}
```

### Loading the Uploadcare Widget

You can load the Uploadcare library in your router or directly into a template by using

``` js
Ucare.load();
```

The library only loads if it hasn't already, so you don't need to worry about multiple loads. We provide and update a default widget version, but you can also specify a widget version in your settings which will override the default.

``` js
{
  "public": {
    "uploadcare": {
      "publickey": "********************",
      "version" : "2.5.9"
    }
  },
  ...
}
```

### Storing and Removing

We've added two functions which let you store and remove from Uploadcare. This is useful if you have set your project to not store images automatically. Behind the scenes these functions use the http package with the Uploadcare API. But you don't need to worry about that! Both functions work on the client and the server.

```js
//Both functions will take a cdnLink or uuid
Ucare.store(cdnLink);
Ucare.delete(uuid);
```

Both of these methods have an optional callback that will return the file size of the image. You can use this information to track user media and storage.

``` js
Ucare.store(link, (err, filesize) => {
  if (filesize) {
    //Do something with 'link' and 'filesize'
  }
});
```

### Browser Policy

The package includes the following browser policy to ensure camera uploads and images loaded from Uploadcare pass through. You don't need to do anything, but it's here as a reference.

``` js
//Uploadcare browser policy
BrowserPolicy.content.allowOriginForAll('https://ucarecdn.com');
BrowserPolicy.content.allowEval('https://ucarecdn.com');
BrowserPolicy.content.allowScriptOrigin('https://ucarecdn.com');
BrowserPolicy.content.allowImageOrigin('https://ucarecdn.com');

BrowserPolicy.content.allowOriginForAll('http://ucarecdn.com');
BrowserPolicy.content.allowEval('http://ucarecdn.com');
BrowserPolicy.content.allowScriptOrigin('http://ucarecdn.com');
BrowserPolicy.content.allowImageOrigin('http://ucarecdn.com');

//Blob URLS (camera)
BrowserPolicy.content.allowImageOrigin("blob:");
var constructedCsp = BrowserPolicy.content._constructCsp();
BrowserPolicy.content.setPolicy(constructedCsp +" media-src blob:;");
```

### To Do
- Provide callback for uploadcare loaded

Feel free to make suggestions or log issues on this repo. We will also review pull requests.

### Change-Log
0.2.1 - Underlying HTTP methods only run on the server to stop error messages in the console.


### Credits
This package is based up Nate Strauser's <a href="https://github.com/nate-strauser/meteor-uploadcare-plus/">uploadcare-plus</a> package. We've updated the widget version and included our own methods.
