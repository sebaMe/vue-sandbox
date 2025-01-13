export const isEventRsc = (rsc?: string) => {
  return rsc?.endsWith("------------");
};

export const getEventRsc = (rsc?: string) => {
  return rsc?.slice(0, -12) + "------------";
};

export const isPhaseRsc = (rsc?: string) => {
  return !isEventRsc(rsc) && rsc?.endsWith("--------");
};

export const getPhaseRsc = (rsc?: string) => {
  return rsc?.slice(0, -8) + "--------";
};

export const isUnitRsc = (rsc?: string) => {
  return !isEventRsc(rsc) && !isPhaseRsc(rsc);
};

export const getAncestorRscList = (rsc?: string) => {
  if (isEventRsc(rsc)) {
    return [rsc];
  }

  if (isPhaseRsc(rsc)) {
    return [getEventRsc(rsc), rsc];
  }

  if (isUnitRsc(rsc)) {
    return [getEventRsc(rsc), getPhaseRsc(rsc), rsc];
  }

  return [];
};
