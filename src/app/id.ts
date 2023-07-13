import { irand } from "app/math";

export function id(prefix: string = ""): string {
  return (prefix ? [prefix] : [])
    .concat([
      Date.now().toFixed().padStart(16, "0"),
      irand(2 ** 24)
        .toFixed()
        .padStart(8, "0"),
    ])
    .join("-");
}
