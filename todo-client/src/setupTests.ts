// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

/**
 * NOTE: this is here for snapshots, when have dates and you run snapshots in Jenkins that's in a different region or even Github Actions
 * dates going to be reported differently from when testing locally
 * */

process.env.TZ = 'UTC';

fetchMock.enableMocks();
