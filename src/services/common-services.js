import { Alert, PermissionsAndroid, Platform, Share, } from "react-native";

const SERVICES = {
  getFormData: (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  },
  _returnError: error => {
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      console.log(_response);
      return JSON.parse(_response)?.message
        ? JSON.parse(_response)?.message.toString()
        : error.message?.toString();
    } else {
      if (error === 'Hi Dude') {
        return 'Dismiss';
      } else if (error?.message) {
        if (error?.message === 'Network Error') {
          return 'Network Error';
        } else {
          return error?.message?.toString();
        }
      } else {
        return error?.toString();
      }
    }
  },
  _capitalizeFirst:(str)=>(str.charAt(0).toUpperCase() + str.slice(1)),
  _returnStringify: (data) => JSON.stringify(data),
  _share:async (description = '',url) => {
    try {
      const result = await Share.share({
        message:description?description:url,
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  serialize: (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
};

export default SERVICES;
