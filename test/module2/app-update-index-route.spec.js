const R = require('ramda');

describe('Updated Index Route', () => {
  let spy;
  before(() => {
    if (typeof app === 'undefined') {
      spy = {
        restore: () => { }
      };
    } else {
      spy = sinon.spy(app, 'render');
    }
  });

  it('should contain the index routes with accounts @app-update-index-routes', done => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    request(app)
      .get('/')
      .expect(() => {
        assert(spy.called, 'The index routes may have not been created.');
        assert(spy.firstCall.args[0] === 'index', 'The index routes does not seem to be rendering the `index` view.');
        assert(
          R.propEq('title', 'Account Summary')(spy.firstCall.args[1]),
          'The index routes object `title` key value pair was not updated.'
        );
        const accountsObjectFound = R.allPass([R.has('savings'), R.has('checking'), R.has('credit')]);
        assert(
          accountsObjectFound(spy.firstCall.args[1].accounts),
          'The index routes object may be missing an `accounts: accounts"` key value pair.'
        );
      })
      .end(done);
  });

  after(() => {
    spy.restore();
  });
});
