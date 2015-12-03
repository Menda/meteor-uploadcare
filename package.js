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
  api.use(['underscore','check'], 'client');
  api.use(['browser-policy@1.0.5'], 'server', {weak: false, unordered: false});

  api.addFiles(['client.js'],'client');
  api.addFiles(['server.js'],'server');
  api.addFiles(['policy.js'],'server');

  api.export('loadUploadcare', 'client');
  api.export(['addToMediaStorage', 'removeFromMediaStorage'], ['client','server']);
});
