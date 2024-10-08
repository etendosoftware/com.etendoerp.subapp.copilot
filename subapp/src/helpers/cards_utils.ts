import { CardsMetadata } from '../components/cards/Cards.types';

export const findRowTitle = (
  columns: CardsMetadata[],
): CardsMetadata | undefined => {
  const column = columns.find(
    (columnItem: CardsMetadata) => columnItem.title && columnItem.key,
  );
  return column ?? undefined;
};
