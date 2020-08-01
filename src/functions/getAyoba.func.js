/**
 * Determine the mobile operating system and returns the
 * proper javascript interface
 */
import { hasValue } from './hasValue.func';

export function getAyoba() {
  var userAgent =
    navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return null;
  }

  if (/android/i.test(userAgent)) {
    try {
      // eslint-disable-next-line no-undef
      return !!hasValue(Android);
    } catch (e) {
      if (e instanceof ReferenceError) return null;
    }
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return null; // todo
  }

  return null;
}
