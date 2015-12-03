Package.describe({
  name: 'smalljoys:uploadcare',
  version: '0.0.1',
  summary: 'Joyful Meteor and Uploadcare integration',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('ecmascript');
  api.use(['underscore','ui'], 'client');

  api.addFiles(['client.js'],'client');
  api.addFiles(['server.js'],'server');

  api.export('loadUploadcare', 'client');
});
