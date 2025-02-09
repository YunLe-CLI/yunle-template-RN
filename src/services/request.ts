import axios, {AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';

/**
 * @param url
 * @param option
 */
export default async function request(config: AxiosRequestConfig): Promise<any> {
  interface IAppInfo {
    app_platform: 'android' | 'ios' | string;
    app_version: string; // '0.0.8'
    app_build_number: number | string; // 1
  };
  const appInfo: IAppInfo = {
    app_platform: Platform.OS,
    app_version: DeviceInfo.getVersion(),
    app_build_number: DeviceInfo.getBuildNumber(),
  };
  axios.defaults.headers.common['AppInfo'] = appInfo;
  axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

  return axios(config);
}
