export type Train = {};
export type Station = {};

export type Ticket = {
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: 'pending' | 'completed' | 'in-progress';
    price: string;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    discountCardStatus: 'none' | 'waiting' | 'denied' | 'elderly' | 'family';
    image: string;
};

export type UserActionIncomingData = {
    name: string;
    email?: string;
    password: string;
};

export type UserActionResponse = {
    status: 'success' | 'error';
    message: string;
    token?: string;
}

export type City = {
    _id: string;
    name: string;
};

export type Route = {
    _id: string;
    trainId: string;
    originStationId: string;
    destinationStationId: string;
    basePrice: {$numberDecimal: string};
    name: string;
};

export type Schedule = {
    _id: string;
    routeId: string;
    stationId: string;
    arrivalTime: string;
    departureTime: string;
};