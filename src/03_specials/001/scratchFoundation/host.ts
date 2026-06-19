const URL = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/';

export const getLibrariesURL = (fileName: string): string => {
    const url = `${URL}${fileName}/get`;
    return url;
}