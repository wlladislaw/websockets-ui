import { Ship } from '../../types';

export const setShipCells = (ship: Ship) => {
  const cells = [];

  for (let i = 0; i <= ship.length - 1; i++) {
    if (!ship.direction) {
      cells.push({ x: ship.position.x + i, y: ship.position.y });
    } else {
      cells.push({ x: ship.position.x, y: ship.position.y + i });
    }
  }

  return cells;
};
