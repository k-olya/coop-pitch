import { id } from "./id";

const map = new Map<string, Function>();

export const storeFunction = (fn: Function): string => {
  const _id = id();
  map.set(_id, fn);
  return _id;
};

export const retrieveFunction = (tag: string): Function => {
  const r = map.get(tag);
  if (!r) throw new Error("Function hash not found");
  return r;
};
