import Pattern from '../src/utils/Pattern';

describe('Pattern', () => {
  describe('decompose', () => {
    it('should return decompose pattern', () => {
      const p = Pattern.decompose('{z}/{x}:{y}.png')
      expect(p).toHaveProperty('ext', '.png')
      expect(p).toHaveProperty('pathname', '0')
      expect(p).toHaveProperty('filename', '0/%[fx:page.x/256]:%[fx:page.y/256]')
    });
  })

});
