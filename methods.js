Future = Npm && Npm.require('fibers/future');

Meteor.methods({

  addToMediaStorage: function (image) {
    check(image, String);

    this.unblock();

    let future = new Future();

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
      function (err, res) {
        if (err) {
          future.return(err);
        } else {

          let fileSize = res.data.size;
          future.return(fileSize);

        }
      }
    );

    return future.wait();
  },

  removeFromMediaStorage: function (image) {
    check(image, String);

    this.unblock();

    let future = new Future();

    let uuid = image.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

    HTTP.call(
      'DELETE',
      'https://api.uploadcare.com/files/' + uuid + '/', {
        headers: {
          Accept: 'application/json',
          Date: new Date().toJSON(),
          Authorization: 'Uploadcare.Simple ' + Meteor.settings.public.uploadcare.publickey + ':' + Meteor.settings.private.uploadcare.secretkey
        }
      },
      function (err, res) {
        if (err) {
          future.return(err);
        } else {

          let fileSize = res.data.size;
          future.return(fileSize);

        }
      }
    );

    return future.wait();

  }

});
