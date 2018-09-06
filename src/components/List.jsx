import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { TsComponent } from './TsComponent.tsx';
import { NewItem } from './NewItem';
import { Item } from './Item';
import { generateId } from '../utils/idGenerator';
import { ListItem } from '../models/ListItem';

export class List extends PureComponent {
  static displayName = 'List';

  constructor() {
    super();
    this.state = {
      items: OrderedMap()
    };
  }

  _addItem = itemText => {
    const newItem = new ListItem({
      id: generateId(),
      text: itemText,
      isInEditMode: false,
    });

    this.setState(prevState => ({
      items: prevState
        .items
        .set(newItem.id, newItem),
    }));
  };

  _saveItem = (itemId, itemText) => {
    const savedItem = {
      id: itemId,
      text: itemText,
      isInEditMode: false
    };

    this.setState(prevState => ({
      items: prevState
        .items
        .mergeIn([itemId], savedItem),
    }));
  };

  _setEdit = (itemId) => {
    this.setState(prevState => ({
      items: prevState
        .items
        .mergeIn([itemId], { isInEditMode: true }),
    }));
  };

  _cancelEdit = (itemId) => {
    this.setState(prevState => ({
      items: prevState
        .items
        .mergeIn([itemId], { isInEditMode: false }),
    }));
  };

  _renderListItems = () =>
    this.state
      .items
      .valueSeq()
      .map((item, index) => (
        <li
          className="list-group-item"
          key={item.id}
        >
          <Item
            item={item}
            index={index + 1}
            onEdit={this._saveItem}
            onDelete={this._deleteItem}
            onClick={this._setEdit}
            onCancel={this._cancelEdit}
          />
        </li>)
      );

  _deleteItem = (deletedItemId) => {
    this.setState(prevState => ({
      items: prevState
        .items
        .delete(deletedItemId)
    }));
  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent
              name="𝕱𝖆𝖓𝖈𝖞"
              invisible
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
                <ul className="list-group">
                  {this._renderListItems()}
                  <li className="list-group-item">
                    <NewItem onAdd={this._addItem} />
                  </li>
                </ul>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
