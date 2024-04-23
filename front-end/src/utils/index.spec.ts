import { parseJwt, calculateTicketPrice } from './index';

describe('parseJwt', () => {
    it('should correctly parse a JWT', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const expectedPayload = {
            "sub": "1234567890",
            "name": "John Doe",
            "iat": 1516239022
        };

        expect(parseJwt(token)).toEqual(expectedPayload);
    });

    it('should return null for an invalid JWT', () => {
        const token = 'invalid';

        expect(parseJwt(token)).toBeNull();
    });
});

describe('calculateTicketPrice', () => {
    it('should apply no discount during peak time', () => {
        const price = calculateTicketPrice(100, '08:00', false, false, false);
        expect(price).toBe('100.00');
    });

    it('should apply a 5% discount outside of peak time', () => {
        const price = calculateTicketPrice(100, '12:00', false, false, false);
        expect(price).toBe('95.00');
    });

    it('should apply a 34% discount for seniors outside of peak time', () => {
        const price = calculateTicketPrice(100, '12:00', true, false, false);
        expect(price).toBe('66.00');
    });

    it('should apply a 10% discount for travelers with a child, regardless of time', () => {
        const price = calculateTicketPrice(100, '08:00', false, true, false);
        expect(price).toBe('90.00');
    });

    it('should apply a 50% discount for travelers with a child and a family card, regardless of time', () => {
        const price = calculateTicketPrice(100, '08:00', false, true, true);
        expect(price).toBe('50.00');
    });
});


