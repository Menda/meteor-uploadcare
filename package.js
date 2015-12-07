Package.describe({
  name: 'smalljoys:uploadcare',
  version: '0.0.4',
  summary: 'Joyful Meteor and Uploadcare integration',
  git: 'https://github.com/smalljoys/meteor-uploadcare',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('ecmascript');
  api.use(['underscore','check','http'], 'client');
  api.use(['browser-policy@1.0.5'], 'server', {weak: false, unordered: false});

  api.addFiles(['ucare.js'],['client','server']);
  api.addFiles(['methods.js'],'server');
  api.addFiles(['policy.js'],'server');

  api.export('Ucare', ['client','server']);
  api.export(['addToMediaStorage', 'removeFromMediaStorage'], ['client','server']);
});
