import { MultiLinesPipe } from './milti-lines.pipe';

describe('SeveralLinesPipe', () => {
  it('create an instance', () => {
    const pipe = new MultiLinesPipe();
    expect(pipe).toBeTruthy();
  });
});
