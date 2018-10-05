import { item } from './item';
import { ListItem } from '../../models/ListItem';
import {
  startEditing,
  stopEditing,
  updateText
} from '../../actions';

describe('item reducer', () => {
  const itemId = '5';
  const defaultItem = new ListItem({
    id: itemId,
    isInEditMode: false,
    text: 'Lorem ipsum',
  });

  const unknownAction = {
    type: 'UNKNOWN_ACTION',
    payload: {
      text: 'Run the tests',
      id: itemId
    }
  };

  it('should return the initial state with undefined state', () => {
    const expectedState = ListItem();

    const actualState = item(undefined, unknownAction);

    expect(expectedState).toEqual(actualState);
  });

  it('should return previous state on unknown action', () => {
    const expectedState = defaultItem;

    const actualState = item(defaultItem, unknownAction);

    expect(expectedState).toEqual(actualState);
  });

  it('should start edit mode of selected item when START_EDITING action is dispatched', () => {
    const expectedState = defaultItem.merge({ isInEditMode: true });

    const actualState = item(defaultItem, startEditing(itemId));

    expect(expectedState).toEqual(actualState);
  });

  it('should end edit mode of selected item when STOP_EDITING action is dispatched', () => {
    const defaultItemInEditMode = defaultItem.merge({ isInEditMode: true });
    const expectedState = defaultItem.merge({ isInEditMode: false });

    const actualState = item(defaultItemInEditMode, stopEditing(itemId));

    expect(expectedState).toEqual(actualState);
  });

  it('should update selected item when UPDATE_TEXT action is dispatched', () => {
    const newText = 'Buy Beer';
    const expectedState = defaultItem.merge({ text: newText });

    const actualState = item(defaultItem, updateText(defaultItem.id, newText));

    expect(expectedState).toEqual(actualState);
  });
});
