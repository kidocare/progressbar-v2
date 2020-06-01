/**
 * Http Library
 * Library for http request
 *
 * @version 2.0.0
 * @author Morton Nari
 * @license MIT
 * morton.nari@yahoo.com.au
 *
 */
class EasyHTTP {
  // HTTp get request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }
}
