import { h, JSX } from '@stencil/core';

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  subHours,
  addMinutes,
  subDays,
} from 'date-fns';

import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nWalkingDistanceArrival, i18nWalkingDistanceDeparture } from '../../global/i18n';

export const durationToTime = (duration: number): string => {
  const result = [];
  const now = Date.now();
  let future = addMinutes(now, duration);

  const days = differenceInDays(future, now);
  if (days > 0) {
    result.push(`${days} d`);
    future = subDays(future, days);
  }

  const hours = differenceInHours(future, now);
  if (hours > 0) {
    result.push(`${hours} h`);
    future = subHours(future, hours);
  }

  const minutes = differenceInMinutes(future, now);
  if (minutes > 0) {
    result.push(`${minutes} min`);
  }

  return result.join(' ');
};

export const isProductIcon = (transport: string): boolean => {
  const possibleTransportTypes = [
    'bex',
    'cnl',
    'ec',
    'en',
    'gex',
    'ic',
    'ice',
    'icn',
    'ir',
    'nj',
    'ogv',
    'pe',
    're',
    'rj',
    'rjx',
    'rx',
    'sn',
    'rgv',
    'vae',
  ];

  if (possibleTransportTypes.includes(transport)) {
    return true;
  }

  return false;
};

export const renderIconProduct = (transport: string, line?: string): JSX.Element => {
  let dashLine = '';
  if (line) {
    dashLine = '-' + line;
  }
  return <sbb-icon class="timetable__row-transport" name={transport.toLowerCase() + dashLine} />;
};

export const renderStringProduct = (vehicleName: string, line: string): JSX.Element => {
  return <span class="timetable__row-transportnumber">{vehicleName + ' ' + line}</span>;
};

export const walkTimeBefore = (walkTime: number): JSX.Element => {
  return (
    <span class="timetable__row-walktime">
      <sbb-icon name="walk-small"></sbb-icon>
      <time dateTime={'P' + walkTime + 'M'}>
        <span class="screenreaderonly">{i18nWalkingDistanceDeparture[getDocumentLang()]}</span>
        {walkTime}
        <span aria-hidden="true">'</span>
      </time>
    </span>
  );
};

export const walkTimeAfter = (walkTime: number): JSX.Element => {
  return (
    <span class="timetable__row-walktime">
      <time dateTime={'P' + walkTime + 'M'}>
        <span class="screenreaderonly">{i18nWalkingDistanceArrival[getDocumentLang()]}</span>
        {walkTime}
        <span aria-hidden="true">'</span>
      </time>
      <sbb-icon name="walk-small"></sbb-icon>
    </span>
  );
};
