import { Page, Locator, expect } from "@playwright/test"
import { roomBookingDTO, dateDTO } from '../../src/models/bookingData.model';

class ReservationRoomPage {
    readonly page: Page;
    readonly checkInDate: Locator;
    readonly checkOutDate: Locator;
    readonly bookNowButton: Locator;
    readonly pageTitle: Locator;
    readonly doReservationButton: Locator;
    readonly bookThisRoomTitle: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly phoneNumberField: Locator;
    readonly reserveNowButton: Locator;
    readonly reservationConfirmationMessage: Locator;
    readonly confirmedDate: Locator;
    readonly returnHomeButton: Locator;
    readonly mainTitle: Locator;
    readonly errorMessage: Locator;
    readonly checkAvailabilityButton: Locator;
    readonly roomName: Locator;
  
    constructor(page:Page){
    this.page = page;
    this.checkInDate = this.page.locator('div').filter({ hasText: /^Check In$/ }).getByRole('textbox')
    this.checkOutDate = this.page.locator('div').filter({ hasText: /^Check Out$/ }).getByRole('textbox')
    this.bookNowButton = this.page.locator(':text("Book now")')
    this.pageTitle = this.page.locator('h1')
    this.doReservationButton = this.page.locator('#doReservation')
    this.bookThisRoomTitle = this.page .locator('h2').filter({ hasText: 'Book this room' })
    this.firstNameField = this.page.locator('input[placeholder="Firstname"]')
    this.lastNameField = this.page.locator('input[placeholder="Lastname"]')
    this.emailField = this.page.locator('input[placeholder="Email"]')
    this.phoneNumberField = this.page.locator('input[placeholder="Phone"]')
    this.reserveNowButton = this.page.getByRole('button', { name: 'Reserve Now' })
    this.reservationConfirmationMessage = this.page.getByRole('heading', { name: 'Booking Confirmed' })
    this.confirmedDate = this.page.locator('p strong')
    this.returnHomeButton = this.page.locator('a[type="button"]')
    this.mainTitle = this.page.locator('h1')
    this.errorMessage = this.page.locator('div [role="alert"]')
    this.checkAvailabilityButton = this.page.getByRole('button', { name : 'Check Availability'})
    this.roomName = this.page.locator('h5[class="card-title"]')
    }

    async bookingTheRoom(date: dateDTO){
        await this.checkInDate.fill(date.checkIn);
        await this.checkOutDate.fill(date.checkOut);
        await this.bookNowButton.nth(1).click({ force: true });
        await expect(this.pageTitle).toContainText('Room');
        await this.doReservationButton.click();
    }

    async fillValidCredentials(room: roomBookingDTO){
        await expect(this.bookThisRoomTitle.first()).toBeVisible();
        await this.firstNameField.fill(room.firstName);
        await this.lastNameField.fill(room.lastName);
        await this.emailField.fill(room.email);
        await this.phoneNumberField.fill(room.phoneNumber);
        await this.reserveNowButton.click();
    }

    async fillChickInAndCheckoutDates(checkIn: string, checkOut: string){
        await this.checkInDate.fill(checkIn);
        await this.checkOutDate.fill(checkOut);
    }
}

export {ReservationRoomPage}