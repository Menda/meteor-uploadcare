Ucare = {};

Ucare.store = function(image) {
  Meteor.call('addToMediaStorage', image);
};

Ucare.delete = function(image) {
  Meteor.call('removeFromMediaStorage', image);
};

//---------

Ucare.load = function(key, callback) {

  if(typeof uploadcare === "undefined"){
    if(!key && Meteor.settings && Meteor.settings.public && Meteor.settings.public.uploadcare && Meteor.settings.public.uploadcare.publickey)
        key = Meteor.settings.public.uploadcare.publickey;

    if(key){
      window.UPLOADCARE_PUBLIC_KEY = key;

      // Functions to run after the script tag has loaded
      var loadCallback = function() {
        if (Object.prototype.toString.call(callback) === "[object Function]") {
          if(typeof console !== "undefined") {
            console.log("Uploadcare loaded");
          }
          callback();
        }
      };

      // If the script doesn't load
      var errorCallback = function(error) {
        if(typeof console !== "undefined") {
          console.log(error);
        }
      };

      // Generate a script tag
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://ucarecdn.com/widget/2.5.5/uploadcare/uploadcare.full.min.js";
      script.onload = loadCallback;
      script.onerror = errorCallback;

      // Load the script tag
      document.getElementsByTagName('head')[0].appendChild(script);

    } else{
      if(typeof console !== "undefined") {
        console.log("Couldn't load uploadcare - no public key set");
      }
    }
  } else {
    if(typeof console !== "undefined") {
      console.log("Uploadcare already loaded");
    }
  }
};
