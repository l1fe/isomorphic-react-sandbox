describe('The Question list', () => {
  beforeAll(() => {
    console.log('Before all!');
  })

  beforeEach(() => {
    console.log('Before each!');
  });

  afterAll(() => {
    console.log('After all');
  });

  afterEach(() => {
    console.log('After each!');
  });

  it('should display a list of items', () => {
    expect(2 + 2).toEqual(4);
  });

  it('should be meaning of life', () => {
    expect(40 + 2).toEqual(42);
  });
})
