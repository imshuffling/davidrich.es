const FIRST_ROW_ITEMS = 2;
const REMAINING_COLUMNS = 3;

export interface GridLayout {
  fill: boolean;
}

export function gridLayout(total: number, index: number): GridLayout {
  const remaining = total - FIRST_ROW_ITEMS;
  const isLast = index === total - 1;
  const fill = isLast && remaining > 0 && remaining % REMAINING_COLUMNS !== 0;
  return { fill };
}
