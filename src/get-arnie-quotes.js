/*

Dear Smokeball,

I appreciate being given the opportunity to speak to Brogan recently, as well as complete this technical task.

Essentially, the 'getArnieQuotes' function could have been succinctly implemented using a single line solution as follows:

    return await Promise.all(urls.map(url => httpGet(url))).then(responses => responses.map(response => ({[response.status === 200 ? "Arnie Quote" : "FAILURE"]: JSON.parse(response.body).message})));

Obviously, this isn't particularly readable or maintainable, and thus the logic has been split up within the testable solution. Speaking of, I've kept the implementation simple given the limited requirements and test cases. However, it lacks the input validation and error handling that would be expected of a production-ready function.

Hypothetically, the input validation and error handling could be implemented as follows:
    1. Ensure that the 'urls' argument is an array. If not, determine whether to throw an exception (thereby rejecting the promise), or permit falsy values (e.g., undefined, null, etc.) and simply return an empty 'results' array.
    2. Ensure that the 'urls' array is non-empty. If not (and as per above), determine whether to throw an exception (thereby rejecting the promise), or permit an empty 'urls' array and simply return an empty 'results' array.
    3. Ensure that each element within the 'urls' array is a string.
    4. Ensure that each string within the 'urls' array is a valid format/pattern via regular expressions.
    5. Opt for the Promise.allSettled() method, rather than the Promise.all() method, to handle and filter individual HTTP GET request failures/rejections, which provides more granularity than the all-or-nothing approach.
    6. Ensure that each element within the 'responses' array is an object.
    7. Ensure that each object within the 'responses' array has the correct properties (i.e., status and body) and data types for the mapped values (i.e., integer for the status and string for the body).

Typically, this level of comprehensiveness likely isn't required, and it would depend on the intended workload and associated priority (i.e., performance, data integrity and security, etc.).

Hopefully the provided solution is what you were after, and I hope to have the chance to discuss it with you further.

Best regards,
Ben Cummings.

*/

const { httpGet } = require('./mock-http-interface');

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses according to the challenge instructions and returns the results.
 * 
 * @param {string[]} urls -- The URLs to be requested.
 * @returns {Promise} -- A promise which resolves to a results array.
 */
const getArnieQuotes = async (urls) => {
  // Creates an array of promises (facilitating asynchronous non-blocking execution) representing the HTTP GET requests sent for the specified URLs.
  const requests = urls.map(url => httpGet(url));

  // Waits for all the HTTP responses to return (i.e., promises to resolve) and creates an array of objects representing the outcomes.
  const responses = await Promise.all(requests);

  // Processes the returned HTTP responses by mapping the properties (i.e., keys) based on the HTTP status codes (somewhat reductively, given that only 200 represents success, and everything else represents failure) and parsing the stringified JSON body to extract the message (i.e., quote or error).
  const results = responses.map(response => ({[response.status === 200 ? "Arnie Quote" : "FAILURE"]: JSON.parse(response.body).message}));

  // Finally, returns the processed results.
  // "Dillon! You son of a..."
  return results;
};

module.exports = {
  getArnieQuotes,
};
