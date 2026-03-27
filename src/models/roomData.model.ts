export interface roomParamsDTO {
accessible: boolean;
description: string;
features: string[];
image: string;
roomName: string;
roomPrice: string;
type: string;
}

export interface bookingDataApiDTO {
bookingdates: {checkin: string, checkout: string};
depositpaid: boolean;
email: string;
firstname: string;
lastname: string;
phone: string;
roomid: number;
}