import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { roomParamsDTO } from '../src/models/roomData.model';

export const extractRoomId = (body: any): number | null =>
  body.room?.roomid || body.rooms?.roomid || null;

export const generateRoomDTO = (): roomParamsDTO => ({
          roomName: '175',
          type: 'Twin',
          accessible: true,
          description: 'Made in New Japan',
          image: '/images/room2.jpg',
          roomPrice: '145',
          features: ['WiFi', 'TV', 'Refreshments', 'Safe', 'Free breakfast'],
});

export const createRoomByAdmin = async (
  request: APIRequestContext,
  token: string,
  customData?: Partial<roomParamsDTO>
  ): Promise<number> => {
  const roomData = { ...generateRoomDTO(), ...customData };
  const response = await request.post('/api/room', {
    headers: { 'Cookie': `token=${token}` },
    data: roomData,
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  
  console.log(JSON.stringify(body, null, 2));

 
  const getResponse = await request.get('/api/room', {
  headers: { Cookie: `token=${token}` },
});

const rooms = (await getResponse.json()).rooms;

const createdRoom = rooms.find(
  (r: any) => r.roomName === roomData.roomName
);

const roomid = createdRoom.roomid;
  return roomid as number;
};



export async function deleteRoom(
  request: APIRequestContext, 
  roomid: number, 
  token: string
) {
  return request.delete(`/api/room/${roomid}`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
}