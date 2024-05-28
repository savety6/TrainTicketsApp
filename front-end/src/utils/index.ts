export function parseJwt(token: string): object | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;  // Return null or handle error appropriately if the token is invalid
    }
}

export function isLocalStorageForTokenValid(): boolean {
    const token = localStorage.getItem('TrainTicketsApp-jwt');
    if (token) {
        const decoded = parseJwt(token);
        if (decoded) {
            return true;
        }
    }
    return false;
}

export function calculateTicketPrice(basePrice: number, travelTime: string, hasSeniorCard: boolean, isTravelingWithChild: boolean, hasFamilyCard: boolean): string {
    // Convert travel time to minutes
    const hour = parseInt(travelTime.split(':')[0]);
    const minute = parseInt(travelTime.split(':')[1]);
    const timeInMinutes = hour * 60 + minute;

    // Determine if it is peak time
    const isPeakTime = (timeInMinutes >= 450 && timeInMinutes <= 570) || (timeInMinutes >= 960 && timeInMinutes <= 1170);

    // Calculate base discount based on time
    let discount = isPeakTime ? 0 : 0.05;

    // Additional discount rules
    if (hasSeniorCard && !isPeakTime) {
        discount = 0.34; // Overrides the time-based discount if any
    } else if (isTravelingWithChild) {
        if (hasFamilyCard) {
            discount = 0.50; // Overrides other discounts
        } else {
            discount = 0.10; // Overrides the time-based discount if any
        }
    }

    // Calculate final price
    const finalPrice = basePrice * (1 - discount);
    return finalPrice.toFixed(2);
}

