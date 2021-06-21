import React from 'react';

const getInitialOrientation = () => {
  if (window.innerHeight > window.innerWidth)
    return 'portrait-primary';
  else return 'landscape-primary';
};

export default () => {
  const [screenOrientation, setScreenOrientation] = React.useState(
    getInitialOrientation(),
  );

  React.useEffect(() => {
    window.addEventListener(
      'orientationchange',
      handleOrientationChange,
    );
    return () => {
      window.removeEventListener(
        'orientationchange',
        handleOrientationChange,
      );
    };
  }, []);

  const handleOrientationChange = (e) =>
    setScreenOrientation(e.target.screen.orientation.type);

  return screenOrientation;
};
