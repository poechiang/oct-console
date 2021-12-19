
import { merge } from 'lodash';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import {
    CHANGE_LANG,
    CHANGE_NAVIGATOR,
    HIDE_NAVIGATOR,
    HIDE_WALLPAPER,
    SHOW_NAVIGATOR,
    SHOW_WALLPAPER
} from './actions';
let store: any = null;

export const language = (state = store, { type, ...payload }: ReduxAction) => {
    if (type === CHANGE_LANG) {
        return payload.language;
    }
    return state;
};

/** 导航栏相关 */
export const navigator = (state = store, { type, ...payload }: ReduxAction) => {
    if (type === CHANGE_NAVIGATOR) {
        return merge({}, state, { url: payload });
    } else if (type === SHOW_NAVIGATOR) {
        return merge({}, state, { visible: true });
    } else if (type === HIDE_NAVIGATOR) {
        return merge({}, state, { visible: false });
    }
    return state;
};
/** 消息通知 */
export const messages = (state = store, { type, ...payload }: ReduxAction) => {
    if (type === CHANGE_NAVIGATOR) {
        return merge({}, state, payload);
    }
    return state;
};
/** 页面墙纸 */
export const wallpaper = (state = store, { type }: ReduxAction) => {
    if (type === SHOW_WALLPAPER) {
        return merge({}, state, { visible: true });
    } else if (type === HIDE_WALLPAPER) {
        return merge({}, state, { visible: false });
    }
    return state;
};
const initStore = (defaults: any) => {
    if (store) return store;
    store = createStore(
        combineReducers({
            language,
            navigator,
            messages,
            wallpaper
        }),
        defaults
    );
    return store;
};
export * from './actions';
export { Provider, connect };
export default initStore;
