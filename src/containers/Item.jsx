import { connect } from 'react-redux';
import { Item } from '../components/Item';

const mapStateToProps = ({ items }, { id }) => ({
  item: items.get(id)
});

const ConnectedItem = connect(mapStateToProps)(Item);
export { ConnectedItem as Item };
