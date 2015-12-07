Future = Npm && Npm.require('fibers/future');

Meteor.methods({

  addToMediaStorage: function (image, user) {
    check(image, String);
    check(user, String);

    this.unblock();

    var future = new Future();

    console.log(image);

    HTTP.call(
      'PUT',
      'https://api.uploadcare.com/files/' + uuid + '/storage/', {
        headers: {
          Accept: 'application/json',
          Date: new Date().toJSON(),
          Authorization: 'Uploadcare.Simple ' + Meteor.settings.public.uploadcare.publickey + ':' + Meteor.settings.private.uploadcare.secretkey
        }
      },
      function (err, response) {
        if (err) {
          future.return(err, null);
        } else {

          if(user){
            Meteor.users.update(user, {
              $addToSet: {
                "profile.userMedia": image
              }
            });
          }

          future.return(null, true);
        }
      }
    );

    return future.wait();
  },

  removeFromMediaStorage: function (image, user) {
    check(image, String);
    check(user, Match.Optional(String));

    this.unblock();

    HTTP.del(
      image, {
        headers: {
          Accept: 'application/json',
          Date: new Date().toJSON(),
          Authorization: 'Uploadcare.Simple ' + Meteor.settings.public.uploadcare.publickey + ':' + Meteor.settings.private.uploadcare.secretkey
        }
      }
    );

    if(user){
      Meteor.users.update(user, {
        $pull: {
          "profile.userMedia": image
        }
      });
    }

  }

});
