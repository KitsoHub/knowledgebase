
import {tokenService} from '../token.service';


describe('TokenService', () => {

    beforeEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    });

    describe('setToken', () => {
        it('sets and gets token', () => {

            const result = tokenService.setToken('test-token');

            expect(result).toBe(true);
            expect(tokenService.getAccessToken()).toBe('test-token');
        })
    })
});
