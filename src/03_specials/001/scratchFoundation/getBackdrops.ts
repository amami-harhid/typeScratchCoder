import BacdropsJson from "./json/backdrops.json";
import { getLibrariesURL } from './host';
import type { TypeBackdropBankVal } from "./backdrops";

export const getBackdropPath = ( name: TypeBackdropBankVal) : string => {

    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const element of BacdropsJson) {
        if(element.name == name) {
            const fileName = element.md5ext;

            return getLibrariesURL(fileName);
        }
    }
    return '';
}