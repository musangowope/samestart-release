import React from 'react';

export default () => {
  const [screenOrientation, setScreenOrientation] = React.useState(
    window.screen.orientation.type,
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
