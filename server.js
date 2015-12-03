Meteor.methods({

  addToMediaStorage: function (user_id, uuid) {
    check(user_id, String);
    check(uuid, String);

    this.unblock();

    HTTP.put(
      'https://api.uploadcare.com/files/' + uuid + '/storage/', {
        headers: {
          Accept: 'application/json',
          Date: new Date().toJSON(),
          Authorization: 'Uploadcare.Simple ' + Meteor.settings.public.uploadcare.publickey + ':' + Meteor.settings.private.uploadcare.secretkey
        }
      }
    );

    Meteor.users.update(user_id, {
      $addToSet: {
        "profile.userMedia": uuid
      }
    });

  },

  removeFromMediaStorage: function (user_id, uuid) {
    check(user_id, String);
    check(uuid, String);

    this.unblock();

    HTTP.del(
      'https://api.uploadcare.com/files/' + uuid + '/', {
        headers: {
          Accept: 'application/json',
          Date: new Date().toJSON(),
          Authorization: 'Uploadcare.Simple ' + Meteor.settings.public.uploadcare.publickey + ':' + Meteor.settings.private.uploadcare.secretkey
        }
      }
    );

    Meteor.users.update(user_id, {
      $pull: {
        "profile.userMedia": uuid
      }
    });

  }

});
