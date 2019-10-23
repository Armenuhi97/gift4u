import { DICTIONARY } from "./dictionary";

export function translate(key:string) {
    let activeLanguage=JSON.parse(localStorage.getItem('language_key'))
    return DICTIONARY[activeLanguage][key]
}
