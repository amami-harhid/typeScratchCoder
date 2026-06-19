import SoundsJson from "./json/sounds.json";
import { getLibrariesURL } from './host';
import type { TypeSoundBankVal } from "./sound";

export const getSoundPath = ( name: TypeSoundBankVal) : string => {

    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const element of SoundsJson) {
        if(element.name == name) {
            const fileName = element.md5ext;
            return getLibrariesURL(fileName);
        }
    }
    return '';
}