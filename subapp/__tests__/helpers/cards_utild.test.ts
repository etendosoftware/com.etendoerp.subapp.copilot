import { findRowTitle } from "../../src/helpers/cards_utils";



it('should return first column that has both title and key properties', () => {
    const columns = [
      { key: 'id', title: null },
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' }
    ];

    const result = findRowTitle(columns);

    expect(result).toEqual({ key: 'name', title: 'Name' });
  });

  it('should return first column that has both title and key properties', () => {
    const columns = [
      { key: 'id', title: null },
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' }
    ];

    const result = findRowTitle(columns);

    expect(result).toEqual({ key: 'name', title: 'Name' });
  });