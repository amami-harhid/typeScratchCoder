import CostumesJson from "./json/costumes.json";
import { getLibrariesURL } from './host';
import type { TypeCostumeBankVal } from "./costumes";

export const getCostumePath = ( name: TypeCostumeBankVal) : string => {

    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const element of CostumesJson) {
        if(element.name == name) {
            const fileName = element.md5ext;

            return getLibrariesURL(fileName);
        }
    }
    return '';
}