import CostumesJson from './json/costumes.json';
import BackdropsJson from './json/backdrops.json';
import SoundJson from './json/sounds.json';

export const genCostume = ()=>{
    let str = 'export const CostumeBank = {\n';
    // eslint-disable-next-line
    for(const element of CostumesJson) {
        str+=`    ${element.name.replaceAll('-','').replaceAll(' ','_')}: '${element.name}',\n`;

    }
    str += '} as const;\n';
    str += 'export type TypeCostumeBankKey = keyof typeof CostumeBank;\n';
    str += 'export type TypeCostumeBankVal = typeof CostumeBank[TypeCostumeBankKey];';
    return str;
}

export const genBackdrop = ()=>{
    let str = 'export const BackdropBank = {\n';
    // eslint-disable-next-line
    for(const element of BackdropsJson) {
        str+=`    ${element.name.replaceAll('-','').replaceAll(' ','_')}: '${element.name}',\n`;

    }
    str += '} as const;\n';
    str += 'export type TypeBackdropBankKey = keyof typeof BackdropBank;\n';
    str += 'export type TypeBackdropBankVal = typeof BackdropBank[TypeBackdropBankKey];';
    return str;
}

export const genSound = ()=>{
    let str = 'export const SoundBank = {\n';
    // eslint-disable-next-line
    for(const element of SoundJson) {
        str+=`    ${element.name.replaceAll('-','').replaceAll(' ','_')}: '${element.name}',\n`;
    }
    str += '} as const;\n';
    str += 'export type TypeSoundBankKey = keyof typeof SoundBank;\n';
    str += 'export type TypeSoundBankVal = typeof SoundBank[TypeSoundBankKey];';
    return str;
}