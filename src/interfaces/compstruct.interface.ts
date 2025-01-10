export interface ICompStructItem {
  Rsc: string;
  Status: string;
  Name: string;
  ListIndex: number;
  PhasesFirstKey: string;
  Phases: {
    [rsc: string]: ICompStructItem;
  };
  UnitsFirstKey: string;
  Units: {
    [rsc: string]: ICompStructItem;
  };
  SubunitsFirstKey: string;
  Subunits: {
    [rsc: string]: ICompStructItem;
  };
}
