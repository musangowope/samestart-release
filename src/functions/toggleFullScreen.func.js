import screenfull from 'screenfull';

export const closeFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull
      .exit()
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
  }
};

export const requestFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull
      .request()
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
  }
};
