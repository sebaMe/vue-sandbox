export const isEventRsc = (rsc?: string) => {
  return rsc?.endsWith("------------");
};

export const isPhaseRsc = (rsc?: string) => {
  return !isEventRsc(rsc) && rsc?.endsWith("--------");
};

export const isUnitRsc = (rsc?: string) => {
  return !isEventRsc(rsc) && !isPhaseRsc(rsc);
};
