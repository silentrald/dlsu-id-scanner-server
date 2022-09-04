
/**
 * Creates a string
 *
 * @param {number} len - Length of the string
 **/ 
export const makeString = (len: number) => {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += 'a';
  }
  return str;
};
