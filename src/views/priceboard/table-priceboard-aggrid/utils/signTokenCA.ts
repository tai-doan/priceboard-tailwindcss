import CryptoJS from 'crypto-js';
import { vnpt_plugin } from '../components/common/Layout/vnpt-plugin';
import { Global } from 'constants/main';
import { ISaveSignTokeCA } from 'interfaces/common';

export function signTokenCA(serial: string, data = {}, type = 'txt') {
  const encodedWord = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord);

  let dataJS = {};
   
	let arrData: any = [];
	dataJS['data'] = encoded;
	dataJS['type'] = type;
				
	let jsData = "";
	jsData += JSON.stringify(dataJS);
	arrData.push(jsData);

  return new Promise((resolve, reject) => {
    vnpt_plugin
    .signArrDataAdvanced(arrData, serial, true)
    ?.then((signedData) => {
      signedData = JSON.parse(signedData)
      if(signedData.length > 0) {
        let d = JSON.parse(signedData[0]);
        switch (d.code) {
          case 0: resolve({ code: 1, data: d.data }); break;
          default: reject({
            externalCode: d.code,
            message: d.error
          })
        }
      } else {
        reject({
          message: 'Return data wrong format'
        })
      }
    }).catch(() => {
      reject({
        message: 'error'
      })
    });
  })
}

export const registerTokenCA = (payload: ISaveSignTokeCA): Promise<Response> | null => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Global.sockets.wts?.authToken?.accessToken}`,
    },
    body: JSON.stringify(payload),
  };

  return fetch(
    `/kgw/cavault/v1/ca/collect`, 
    requestOptions
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.error('Error Save Sign Token CA:', error);
    });
};



// WEBPACK FOOTER //
// ./src/utils/signTokenCA.ts