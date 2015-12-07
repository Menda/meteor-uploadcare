Future = Npm && Npm.require('fibers/future');

Meteor.methods({

  addToMediaStorage: function (image, user) {
    check(image, String);
    check(user, Match.Optional(String));

    this.unblock();

    var future = new Future();

    let uuid = image.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

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

    let uuid = image.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

    HTTP.call(
      'DELETE',
      'https://api.uploadcare.com/files/' + uuid + '/storage/', {
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
