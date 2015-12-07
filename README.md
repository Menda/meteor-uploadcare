# Small Joys: Meteor Uploadcare

A little package that adds Uploadcare to Meteor, and gives you some methods for storage and removal.

Note: This package is developed for the <a href="http://smalljoys.co">Small Joys</a> workflow. If you require something a little lighter, we recommend <a href="https://github.com/nate-strauser/meteor-uploadcare-plus/">Nate Strauser's package</a>.

### Using this package

Add the package to your project:

```js
meteor add smalljoys:meteor-uploadcare
```

You can load the Uploadcare library (2.5.5) in your router or directly into a template by using

```js
Ucare.load();
```

The library only loads if it hasn't already, so you don't need to worry about multiple loads.

Additionally we've added two functions which let you store and remove from Uploadcare. This is useful if you have set your project to not store images automatically. Behind the scenes these functions use the http package with the Uploadcare API. But you don't need to worry about that!

```js
//Both functions will take a cdnLink or uuid
Ucare.store(cdnLink);
Ucare.remove(uuid);
```

These functions also have an optional second argument. If you provide a userId, the functions will attempt to store or remove the image cdnLink or uuid from a userMedia field in the user's profile. This is useful for keeping track of all the images a user has uploaded.

```js
//Both functions will take a cdnLink or uuid
let user = Meteor.userId();
Ucare.store(cdnLink, user);
```

If you use Simple Schema, just include the following field definition within the user profile schema.

```js
//Path would be profile.userMedia
userMedia: {
  type: [String],
  optional: true
},
```

### To Do
- Provide callback for uploadcare loaded

Feel free to make suggestions or log issues on this repo. We will also review pull requests.

### Credits
This package is based up Nate Strauser's <a href="https://github.com/nate-strauser/meteor-uploadcare-plus/">uploadcare-plus</a> package. We've updated the widget version and included our own methods.
