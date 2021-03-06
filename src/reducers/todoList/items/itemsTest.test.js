import { OrderedMap } from 'immutable';
import { items } from './items.js';
import { ListItem } from '../../../models/ListItem';
import { addItemFactory } from '../../../actions/addItemFactory';
import { deleteItem } from '../../../actions';

describe('items reducer', () => {
  const itemId = '5';
  const defaultItems = OrderedMap([
    [
      itemId,
      new ListItem({
        id: itemId,
        text: 'Buy Milk',
      })
    ]
  ]);

  const unknownAction = {
    type: 'UNKNOWN_ACTION',
    payload: {
      text: 'Run the tests',
      id: itemId
    }
  };

  it('should return the initial state with undefined state', () => {
    const expectedState = OrderedMap();

    const actualState = items(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should return previous state on unknown action', () => {
    const expectedState = defaultItems;

    const actualState = items(defaultItems, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should add new item to the store when ADD_ITEM action is dispatched', () => {
    const generateId = () => '5';
    const itemText = 'Run the tests';
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: itemText
        })
      ]
    ]);

    const actualState = items(OrderedMap(), addItemFactory(generateId)(itemText));

    expect(actualState).toEqual(expectedState);
  });

  it('should delete selected item when ITEM_DELETE action is dispatched', () => {
    const expectedState = OrderedMap();

    const actualState = items(defaultItems, deleteItem(itemId));

    expect(actualState).toEqual(expectedState);
  });
});
