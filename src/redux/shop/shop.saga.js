import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
    firestore,
    convertCollectionsSnapShotToMap
} from "../../firebase/firebase.utils";
import { fetchCollectionsSucces, fetchCollectionsFailure } from './shop.actions'; 
import ShopActionTypes from './shop.types';

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection("collections");
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapShotToMap, snapshot);
        yield put(fetchCollectionsSucces(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}