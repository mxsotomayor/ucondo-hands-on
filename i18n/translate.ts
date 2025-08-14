import { messages } from "./messages";
import { Lang } from "./types";

export const trans = (value: string, lang: Lang = "pt") => {
  return messages[lang]?.[value] ?? "";
};
