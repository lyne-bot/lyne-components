import {
  InterfaceImageAttributesSizesConfig,
  InterfaceImageAttributesSizesConfigBreakpoint,
} from './sbb-image.custom';

/**
 * we check the structure of the data manually, so it's safe to use `any`
 * as return type
 */
export default (jsonString: string): InterfaceImageAttributesSizesConfigBreakpoint[] => {
  if (!jsonString || jsonString.length === 0) {
    return [];
  }

  // make sure that we have `breakpoints` key in object
  const errorMessage =
    'sbb-image error: attribute breakpoints has wrong data format. Reference the documentation to see how you should format the data for this attribute.';

  let jsonObject: InterfaceImageAttributesSizesConfig;

  try {
    jsonObject = JSON.parse(jsonString);
  } catch (error) {
    console.warn(errorMessage);

    return [];
  }

  if (!jsonObject.breakpoints || jsonObject.breakpoints.length === 0) {
    console.warn(errorMessage);

    return [];
  }

  // make sure we get an array of breakpoints
  if (!Array.isArray(jsonObject.breakpoints)) {
    console.warn(errorMessage);

    return [];
  }

  /**
   * 1. make sure that each entry within the breakpoints object
   * contains only allowed keys
   * 2. make sure that all necessary keys are present
   */
  let wrongKeyDetected = false;
  let missingKeyDetected = false;

  const allowedKeys = ['image', 'mediaQueries'];

  jsonObject.breakpoints.forEach((breakpoint) => {
    const breakpointKeys = Object.keys(breakpoint);

    breakpointKeys.forEach((breakpointKey) => {
      if (!allowedKeys.includes(breakpointKey)) {
        wrongKeyDetected = true;
      }
    });

    allowedKeys.forEach((allowedKey) => {
      if (!breakpointKeys.includes(allowedKey)) {
        missingKeyDetected = true;
      }
    });
  });

  if (wrongKeyDetected || missingKeyDetected) {
    console.warn(errorMessage);

    return [];
  }

  return jsonObject.breakpoints;
};
