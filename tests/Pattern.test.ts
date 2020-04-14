import Pattern from '../src/utils/Pattern';

describe('Pattern', () => {
  describe('decompose', () => {
    it('should return decompose pattern', () => {
      const p = Pattern.decompose('{z}/{x}:{y}.png')
      expect(p).toHaveProperty('ext', '.png')
    });
  })

});
