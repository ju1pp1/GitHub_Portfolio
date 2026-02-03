import { setStatus } from '../statusActions';
import { SET_REQUEST_STATUS } from '../../constants';
import { describe, expect, it } from 'vitest';


describe('statusActions', () => {
    it('should create an action to set request status', () => {
        const status = 'loading';
        const expectedAction = {
            type: SET_REQUEST_STATUS,
            payload: status,
        };
        expect(setStatus(status)).toEqual(expectedAction);
    });
});