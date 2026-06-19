import CostumesJson from './json/costumes.json';
import BackdropsJson from './json/backdrops.json';
import SoundJson from './json/sounds.json';

export const genCostume = ()=>{
    let str = 'export const costumeBank = {\n';
    // eslint-disable-next-line
    for(const element of CostumesJson) {
        str+=`    ${element.name.replaceAll('-','').replaceAll(' ','_')}: {name:'${element.name}', md5ext: '${element.md5ext},},'\n`;

    }
    str += '} as const;'
    return str;
}

export const genBackdrop = ()=>{
    let str = 'export const backdropBank = {\n';
    // eslint-disable-next-line
    for(const element of BackdropsJson) {
        str+=`    ${element.name.replaceAll('-','').replaceAll(' ','_')}: {name:'${element.name}', md5ext: '${element.md5ext}',},\n`;

    }
    str += '} as const;'
    return str;
}

export const genSound = ()=>{
    let str = 'export const soundBank = {\n';
    // eslint-disable-next-line
    for(const element of SoundJson) {
        str+=`    ${element.name.replaceAll('-','').replaceAll(' ','_')}: {name:'${element.name}', md5ext: '${element.md5ext}',},\n`;

    }
    str += '} as const;'
    return str;
}