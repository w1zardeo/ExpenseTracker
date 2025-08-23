declare module "firebase/auth" {
  import { Persistence } from "firebase/auth";

  // TS не бачить цю функцію, але в runtime вона є
  export function getReactNativePersistence(storage: any): Persistence;
}
