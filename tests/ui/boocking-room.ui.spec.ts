import { test, expect } from '@playwright/test';
import { ReservationRoomPage } from '../../src/pageObject/booking-roomPage';
import { roomBookingDTO, dateDTO } from '../../src/models/bookingData.model';

test.describe('Verify booking flow with valid and invalid data', () => {

  test.beforeEach(async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
  });

  test('TC_001 Verify successful booking flow with valid data', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '23/05/2027',
      checkOut: '27/05/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'John', 
      lastName: 'Johns', 
      email: 'nh.2.krlax@gmail.com', 
      phoneNumber: '+123456789111'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-05-23.*checkout=2027-05-27/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-05-23 - 2027-05-27')
    await expect(bookingForm.reservationConfirmationMessage).toBeVisible();
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_002 Verify First Name input with minimum allowed length (3 chars)', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/06/2027',
      checkOut: '05/06/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Mia', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-06-01.*checkout=2027-06-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-06-01 - 2027-06-05')
    await expect(bookingForm.reservationConfirmationMessage).toBeVisible();
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_003 Verify First Name input with maximum allowed length (18 chars)', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '06/06/2027',
      checkOut: '11/06/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Christopher-Thomas', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-06-06.*checkout=2027-06-11/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-06-06 - 2027-06-11')
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_004 Verify First Name input with less than 3 characters', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '12/06/2027',
      checkOut: '17/06/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Ed', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-06-12.*checkout=2027-06-17/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('size must be between 3 and 18')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_005 Verify First Name input with an empty string', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '18/06/2027',
      checkOut: '23/06/2027'
    }
    const room : roomBookingDTO = {
      firstName: '', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-06-18.*checkout=2027-06-23/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('Firstname should not be blank')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_006 First Name input with more than 18 characters', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '24/06/2027',
      checkOut: '29/06/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Alexandrina-Victoria', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-06-24.*checkout=2027-06-29/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('size must be between 3 and 18')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_007 Verify Last Name input with minimum allowed length (3 chars)', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/07/2027',
      checkOut: '05/07/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Lee', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-07-01.*checkout=2027-07-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-07-01 - 2027-07-05')
    await expect(bookingForm.reservationConfirmationMessage).toBeVisible();
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_008 Verify Last Name input with maximum allowed length (30 chars)', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '06/07/2027',
      checkOut: '11/07/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Featherstonehaugh-Montgomery', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-07-06.*checkout=2027-07-11/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-07-06 - 2027-07-11')
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_009 Verify First Name input with less than 3 characters', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '12/07/2027',
      checkOut: '17/07/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Li', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-07-12.*checkout=2027-07-17/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('size must be between 3 and 30')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_010 Verify Last Name input with more than 30 characters', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '18/07/2027',
      checkOut: '23/07/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Vozdvizhensky-Svyatopolk-Mirsky', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-07-18.*checkout=2027-07-23/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('size must be between 3 and 30')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_011 Verify Last Name input with an empty string', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '24/07/2027',
      checkOut: '29/07/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: '', 
      email: 'test@example.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-07-24.*checkout=2027-07-29/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('Lastname should not be blank');
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_012 Verify email without "@" symbol', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/08/2027',
      checkOut: '05/08/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'rita.strickland.work.email.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-08-01.*checkout=2027-08-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('must be a well-formed email address')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_013 Verify email without a domain part', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/08/2027',
      checkOut: '05/08/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'rita.strickland@', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-08-01.*checkout=2027-08-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('must be a well-formed email address')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_014 Verify email without a local part', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/08/2027',
      checkOut: '05/08/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: '@email.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-08-01.*checkout=2027-08-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('must be a well-formed email address')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_015 Verify email containing a space', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/08/2027',
      checkOut: '05/08/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'rita strickland@email.com', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-08-01.*checkout=2027-08-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('must be a well-formed email address')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_016 Verify email input with an empty string', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/08/2027',
      checkOut: '05/08/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: '', 
      phoneNumber: '+12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-08-01.*checkout=2027-08-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('must not be empty')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_017 Verify phone input with minimum allowed length (11 digits)', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/09/2027',
      checkOut: '05/09/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '12345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-09-01.*checkout=2027-09-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-09-01 - 2027-09-05')
    await expect(bookingForm.reservationConfirmationMessage).toBeVisible();
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_018 Verify phone input with maximum allowed length (21 digits)', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '06/09/2027',
      checkOut: '11/09/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '123456789012345678901'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-09-06.*checkout=2027-09-11/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-09-06 - 2027-09-11')
    await expect(bookingForm.reservationConfirmationMessage).toBeVisible();
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
  });

  test('TC_019 Verify phone input with less than 11 characters', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '12/09/2027',
      checkOut: '17/09/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '1234567890'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-09-12.*checkout=2027-09-17/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('size must be between 11 and 21')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_020 Verify phone input with more than 21 characters', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '18/09/2027',
      checkOut: '23/09/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Sandra', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '1234567890123456789012'
    }
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-09-18.*checkout=2027-09-23/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.errorMessage).toContainText('size must be between 11 and 21')
    await expect(page).not.toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Room')
  });

  test('TC_021 Verify that the earlier booked dates show as Unavailable', async ({ page }) => {
    const bookingForm = new ReservationRoomPage(page);
    const date: dateDTO = {
      checkIn: '01/10/2027',
      checkOut: '05/10/2027'
    }
    const room : roomBookingDTO = {
      firstName: 'Rita', 
      lastName: 'Strickland', 
      email: 'test@example.com', 
      phoneNumber: '123456789111'
    }
    await expect(bookingForm.roomName.first()).toContainText('Single')
    await bookingForm.bookingTheRoom(date);
    await expect(page).toHaveURL(/\/reservation\/\d+\?.*checkin=2027-10-01.*checkout=2027-10-05/);
    await bookingForm.fillValidCredentials(room)
    await expect(bookingForm.confirmedDate).toContainText('2027-10-01 - 2027-10-05')
    await expect(bookingForm.reservationConfirmationMessage).toBeVisible();
    await bookingForm.returnHomeButton.click()
    await expect(page).toHaveURL('https://automationintesting.online/')
    await expect(bookingForm.mainTitle).toContainText('Welcome to Shady Meadows B&B')
    await bookingForm.fillChickInAndCheckoutDates('01/10/2027', '05/10/2027')
    await bookingForm.checkAvailabilityButton.click()
    await  expect(bookingForm.roomName.first()).not.toContainText('Single')
  });

});