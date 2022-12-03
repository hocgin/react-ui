/**
 * adcode: "350200"
 * address: []
 * city: []
 * district: "福建省厦门市"
 * id: "900000108751"
 * location: undefined
 * name: "厦门旅游客运码头-新港城客运站"
 * typecode: "999912"
 */

export interface SearchLbsData {
  name: string;
  adcode: string;
  address: string;
  location: { lng?: number; lat?: number };
}
