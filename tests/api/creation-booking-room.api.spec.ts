import { test, expect, APIResponse } from '@playwright/test';
import { getAuthToken } from '../../helpers/auth.helper';
import { createRoomByAdmin, deleteRoom } from '../../helpers/room.helper';
import { roomParamsDTO, bookingDataApiDTO } from '../../src/models/roomData.model'


test.describe('Verification booking, editing rooms flow by API', () => {
  let token: string;

  test.beforeAll(async ({ request }) => {
    token = await getAuthToken(request);
    expect(token, 'Failed to obtain auth token').toBeTruthy();
  });

  test('Should create a new room and check that the room is created on the user page', async ({ request }) => {
    const roomParams: roomParamsDTO = {
          roomName: '128',
          type: 'Single',
          accessible: true,
          description: 'The beast room in the hotel',
          image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
          roomPrice: '300',
          features: ['WiFi', 'TV', 'Refreshments', 'Safe', 'Free breakfast'],
    }
    const response = await request.post('/api/room', { 
      data: roomParams,
        headers: {
            'Cookie': `token=${token}`,
        },
    });
    
    expect(response.status()).toBe(200);
    const getResponse: APIResponse = await request.get('/api/room',);
    const rooms = (await getResponse.json()).rooms;
    const isExist = rooms.some((room: any) => room.roomName === '128');
    expect(isExist).toBeTruthy();
    });

    test('Book the room using the User page(API), and then check that the room is booked on the Admin page(API)', async ({ request }) => {
    const bookingParams: bookingDataApiDTO = {
         bookingdates: {checkin: '2027-11-24', checkout: '2027-11-29'},
         depositpaid: true,
         email: 'test@example.com',
         firstname: 'Sam',
         lastname: 'Smith',
         phone: '+12345678901',
         roomid: 1,
    }
    const response = await request.post('/api/booking', { 
      data: bookingParams,
        headers: {
            'Cookie': `token=${token}`,
        },
    });
    
    expect(response.status()).toBe(201);

    const getResponse: APIResponse = await request.get('/api/message',{
      headers: {
            'Cookie': `token=${token}`,
        },
    });

    const body  = (await getResponse.json());
    expect(body.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
           name: "Sam Smith",
           subject: "You have a new booking!"
        })
      ])
    );
    });

    test('Edit Room in the Admin page (Rooms) menu using API and check changes in the User page(API)', async ({ request }) => {
    const roomParams: roomParamsDTO = {
          roomName: '385',
          type: 'Single',
          accessible: true,
          description: 'Beauty is a journal',
          image: '/images/room2.jpg',
          roomPrice: '325',
          features: ['WiFi', 'TV', 'Refreshments', 'Safe', 'Free breakfast'],
    }

    const response = await request.put(`/api/room/1`, { 
        data: roomParams, 
        
        headers: {
            'Cookie': `token=${token}`,
        },
    });

    expect(response.status()).toBe(200);

    const getResponse: APIResponse = await request.get('/api/room/1',{
      headers: {
            'Cookie': `token=${token}`,
        },
    });

    const body  = (await getResponse.json());
    expect(body).toEqual(
        expect.objectContaining({
          roomName: '385',
          type: 'Single',
          accessible: true,
          description: 'Beauty is a journal',
          image: '/images/room2.jpg',
          roomPrice: 325,
          features: ['WiFi', 'TV', 'Refreshments', 'Safe', 'Free breakfast'],
        })
    );
});

test('Delete the Room and verify it is removed', async ({ request }) => {
  const roomid = await createRoomByAdmin(request, token);
  const deleteResponse = await deleteRoom(request, roomid, token);

  console.log('Delete status:', deleteResponse.status());
  console.log('Delete body:', await deleteResponse.text());
  expect(deleteResponse.status()).toBe(200);

  const getResponse = await request.get(`/api/room/`);
  const body = await getResponse.json();
  const deletedRoom = body.rooms.find(
  (r: any) => r.roomid === roomid
  );
  expect(deletedRoom).toBeFalsy();
  });

});