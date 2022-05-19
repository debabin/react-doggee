import { API } from './instance';

export * from './instance';
export * from './requests';

// server instance
const baseUrlApi: BaseUrl = 'http://localhost:3001/';
export const api = new API(baseUrlApi);
api.interceptors.response.use((res) => {
  if (res.body.success) {
    return {
      ...res,
      body: {
        data: res.body.data,
        status: res.status,
        success: res.body.success
      }
    };
  }
  return {
    ...res,
    body: { data: res.body.data, status: res.status, success: res.body.success }
  };
});

// export const api = new API(baseUrlApi, {
//   interceptors: {
//     request: [
//       (config) => ({
//         credentials: 'include',
//         ...config,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(!!config?.headers && config.headers)
//         }
//       })
//     ],
//     response: [
//       (res) => {
//         if (res.body.success) {
//           return {
//             ...res,
//             body: {
//               data: res.body.data,
//               status: res.status,
//               success: res.body.success
//             }
//           };
//         }
//         return {
//           ...res,
//           body: { data: res.body.data, status: res.status, success: res.body.success }
//         };
//       }
//     ]
//   }
// });

// dog open api instance
const baseUrlDogApi: BaseUrl = 'http://api.thedogapi.com/v1/';
export const dogApi = new API(baseUrlDogApi);
