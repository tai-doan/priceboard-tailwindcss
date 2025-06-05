import config from 'config';

export function detectPlatform() {
  const toMatchAndroid = [
    /Android/i,
    /webOS/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  const toMatchIOS = [/iPhone/i, /iPad/i, /iPod/i];

  const isAndroid = toMatchAndroid.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
  const isIOS = toMatchIOS.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });

  return config.htsEnv?.enable
    ? 'hts'
    : isAndroid
    ? 'WTS.ANDROID'
    : isIOS
    ? 'WTS.IOS'
    : 'WTS.PC';
}



// WEBPACK FOOTER //
// ./src/utils/detectPlatform.ts