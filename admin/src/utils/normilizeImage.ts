export const NormilizeImage = (str: string) => {
    return str.split('http://62.113.108.16:5000/')
    .join('https://eaql.net/')
};