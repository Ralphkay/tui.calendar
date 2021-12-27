import type { Locator, Page } from '@playwright/test';

import { BoundingBox } from './types';

export async function dragAndDrop(
  page: Page,
  startLocator: Locator,
  targetCoords: { x: number; y: number }
) {
  await startLocator.hover();
  await page.mouse.down();
  await page.mouse.move(targetCoords.x, targetCoords.y, { steps: 15 });
  await page.mouse.up();

  // NOTE: Handling re-render timing issue
  await page.locator('body').hover();
}

export async function selectGridCells(
  page: Page,
  startCellIdx: number,
  endCellIdx: number,
  className: string
) {
  const startCellLocator = page.locator(className).nth(startCellIdx);
  const endCellLocator = page.locator(className).nth(endCellIdx);

  const endCellBoundingBox = await getBoundingBox(endCellLocator);

  await dragAndDrop(page, startCellLocator, {
    x: endCellBoundingBox.x + 10,
    y: endCellBoundingBox.y + 10,
  });
}

export async function getBoundingBox(locator: Locator): Promise<BoundingBox> {
  return (await locator.boundingBox()) ?? { x: NaN, y: NaN, width: NaN, height: NaN };
}
