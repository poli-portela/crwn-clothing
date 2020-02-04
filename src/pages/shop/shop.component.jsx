import React from "react";
import {connect} from 'react-redux'
import { Route } from "react-router-dom";
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from "../collections/collection.component";
import { updateCollections } from '../../redux/shop/shop.actions';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils'; 

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectonPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      loading : true
    }

  }
  unsubscibeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    } )
  }
  
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> } />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectonPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default  connect(null, mapDispatchToProps)(ShopPage);
