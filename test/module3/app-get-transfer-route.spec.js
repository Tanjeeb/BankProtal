describe('Transfer get routes', () => {
  let stack;
  let handleSpy;

  before(() => {
    stack = routeStack('/transfer', 'get') || routeStack('/services/transfer', 'get');
    if (typeof stack === 'undefined') {
      handleSpy = {
        restore: () => {}
      };
    } else {
      handleSpy = sinon.spy(stack, 'handle');
    }
  });

  it('should contain the get transfer routes @app-get-transfer-routes', () => {
    assert(typeof app === 'function', '`app` const has not been created in `app.js`.');
    const req = mockReq();
    const res = mockRes();
    assert(typeof handleSpy === 'function', 'The transfer get routes may not exist yet.');
    handleSpy(req, res);
    assert(res.render.called, 'The transfer post routes may have not been created.');
  });

  after(() => {
    handleSpy.restore();
  });
});
