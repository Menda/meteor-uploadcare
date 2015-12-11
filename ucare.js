Ucare = {};

Ucare.store = function(image, callback) {
  Meteor.call('addToMediaStorage', image, function(err, res){
    if (typeof callback === "function") {
      if(err){
        return callback(err, null);
      }
      return callback(null, res);
    }
  });
};

Ucare.delete = function(image, callback) {
  Meteor.call('removeFromMediaStorage', image, function(err, res){
    if (typeof callback === "function") {
      if(err){
        return callback(err, null);
      }
      return callback(null, res);
    }
  });
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

      let widgetVersion = "2.5.9";

      if(Meteor.settings.public.uploadcare.widgetVersion){
         widgetVersion = Meteor.settings.public.uploadcare.widgetVersion;
      }

      // Generate a script tag
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://ucarecdn.com/widget/" + widgetVersion + "/uploadcare/uploadcare.full.min.js";
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
