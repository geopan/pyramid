import Image from '../src/utils/Image';

describe('Image', () => {
  describe('isBiggerThanTile', () => {
    it('should return true for default image', () => {
      expect(Image.isBiggerThanTile('tests/img/cat.jpg')).toBe(true)
    });
    it('should return false for tile', () => {
      expect(Image.isBiggerThanTile('tests/img/0_0.jpg')).toBe(false)
    });
  })

  describe('maxZoom', () => {
    it('should return 3 for cat img', () => {
      expect(Image.maxZoom('tests/img/cat.jpg')).toEqual(3)
    });
  })

});
