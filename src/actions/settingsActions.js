import {
  DISABLED_BALANCE_ON_ADD,
  DISABLED_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION,
} from "../actions/types";

export const setDisableBalanceOnAdd = () => {
  //Get settings from LocalStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toogle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //Set back to Local Storage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLED_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd,
  };
};

export const setDisableBalanceOnEdit = () => {
  //Get settings from LocalStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toogle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  //Set back to Local Storage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLED_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit,
  };
};

export const setAllowRegistration = () => {
  //Get settings from LocalStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toogle
  settings.allowRegistration = !settings.allowRegistration;

  //Set back to Local Storage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration,
  };
};
