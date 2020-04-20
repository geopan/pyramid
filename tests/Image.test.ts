import Image from '../src/utils/Image';
import sharp from 'sharp'

describe('Image', () => {
  describe('maxZoom', () => {
    it('should return 3 for cat img', async () => {
      const { width=0, height=0} = await sharp('tests/img/cat.jpg').metadata()
      expect(Image.maxZoom(width, height)).toEqual(3)
    });
  })

});
