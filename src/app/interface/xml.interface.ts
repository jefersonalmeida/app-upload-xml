export interface FileInterface {
  name: string;
  data: XmlInterface[];
}

export interface XmlInterface {
  id?: string;
  code: string;
  date: Date;
  region: RegionInterface[];
}

export interface RegionInterface {
  acronym: string;
  purchase: number[];
  generation: number[];
  average_price: number[];
}
