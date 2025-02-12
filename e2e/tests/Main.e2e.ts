import { by, element, expect } from 'detox';

describe('Main', () => {
  it('should have playlist screen', async () => {
    await expect(element(by.text('Mini Vibes'))).toBeVisible();
  });
});
