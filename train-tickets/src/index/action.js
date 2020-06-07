export const ACTION_SET_FROM = 'ACTION_SET_FROM';
export const ACTION_SET_TO = 'ACTION_SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'ACTION_SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'ACTION_SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITYDATA = 'ACTION_SET_CITYDATA';
export const ACTION_SET_IS_LOADING_CITYDATA = 'ACTION_SET_IS_LOADING_CITYDATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'ACTION_SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'ACTION_SET_HIGH_SPEED';

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  }
}

export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  }
}

export function setIsLoadingCityData(isLoadingCtiyData) {
  return {
    type: ACTION_SET_IS_LOADING_CITYDATA,
    payload: isLoadingCtiyData,
  }
}
export function setCityData(cityDate) {
  return {
    type: ACTION_SET_CITYDATA,
    payload: cityDate,
  }
}
// 是否选择只看高铁 布尔
export function toggleHightSpeed() {
  return (dispatch,getState) => {
    const {highSpeed} = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}

export function showCitySelector(currentSelectingLeftCity) {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    });
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity
    })
  }
}
// 隐藏城市选择层
export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  }
}

// 显示选择的城市数据
export function setSelectedCity(city) {
  return (dispatch,getState) => {
    const {currentSelectingLeftCity} = getState();
    if(currentSelectingLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
  }
}

// 选择日期面板显示
export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true,
  }
}
// 隐藏日期选择面板
export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  }
}

// 交换始发站，终点站
export function exchangeFromTo() {
  return (dispatch,getState) => {
    const {from,to} = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  }
}