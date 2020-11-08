import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_CITYDATA,
  ACTION_SET_IS_LOADING_CITYDATA,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_HIGH_SPEED,
} from './action';

export default {
  from(state = "北京",action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_FROM:
        return payload;
        break;
      default:
        return state;
    }
  },
  to(state = "上海",action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_TO:
        return payload;
        break;
      default:
        return state;
    }
  },
  isCitySelectorVisible(state = false,action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
        return payload;
        break;
      default:
        return state;
    }
  },
  currentSelectingLeftCity(state = false,action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
        return payload
        break;
      default:
        return state;
    }
  },
  cityData(state = "",action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_CITYDATA:
        return payload;
        break;
      default:
        return state;
    }
  },
  isLoadingCityData(state = false,action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_IS_LOADING_CITYDATA:
        return payload;
        break;
      default:
        return state;
    }
  },
  isDateSelectorVisible(state = false,action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
        return payload;
        break;
      default:
        return state;
    }
  },
  highSpeed(state = false,action) {
    const {
      type,
      payload
    } = action;
    switch(type) {
      case ACTION_SET_HIGH_SPEED:
        return payload;
        break;
      default:
        return state;
    }
  },
}