module.exports = {
  branches: ['main'],
  tagFormat: 'v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',

    ['@semantic-release/npm', {
      pkgRoot: 'packages/react-flow-modal',
      npmPublish: true,
    }],

    '@semantic-release/github'
  ]
};
