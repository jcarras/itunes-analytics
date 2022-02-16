export interface AppStoreItem {
  id: number;
  title: string;
  category: string;
  rank: number;
  img: string;
  heatMapData: any;
  isDirty: boolean;
}

export interface HeatMapUpdate {
  id: number;
  points: Point[];
}

export interface Point {
  x: number;
  y: number;
}

export interface HeatMapData {
  min: number;
  max: number;
  data: Point[];
}

export enum WebsocketEvents {
  AppItemData = 'AppItemData',
  HeatMapUpdate = 'HeatMapUpdate',
  ResetData = 'ResetData',
  Connect = 'connect',
  Disconnect = 'disconnect',
  Connection = 'connection'
}


