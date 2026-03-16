import { Page } from '@playwright/test';

import { DropdownControl } from '../../controls/dropdown.control';
import { ReactDatePickerHasArrowsControl } from '../../controls/react-datepicker-has-arrows.control';
import { HolidayRequest } from '../../types/holiday.types';
import { getDateParts } from '../../utils/date.utils';
import { BasePage } from '../base.page';

export class HolidaysRaiseRequestPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get holidayCommentTextField() {
        return this.page.getByRole('textbox', { name: 'Comment' });
    }

    get createRequestButton() {
        return this.page.getByRole('button', { name: 'Create Request' });
    }

    get updateRequestButton() {
        return this.page.getByRole('button', { name: 'Update Request' });
    }

    get yesContinueButton() {
        return this.page.getByRole('button', { name: 'Yes, Continue' });
    }

    get ownDeviceRadioButton() {
        return this.page.getByText('Virtual machine on the own');
    }

    get responsibilityCheckbox() {
        return this.page.locator('label[for="policy"]').locator('[class*="Checkbox_check"]');
    }

    get medicalCertificateAvailableCheckbox() {
        return this.page.getByText('Medical Certificate available');
    }

    async selectRequestType(requestType: HolidayRequest) {
        await this.requestTypeDropDown.selectOption(requestType);
    }

    async selectCountry(country: string) {
        await this.countryDropDown.selectOption(country);
    }

    async selectAssociate(fullName: string) {
        await this.employeeSelectDropDown.selectOption(fullName, { exact: false });
    }

    async setHolidayStartDate(date: Date) {
        await this.holidayFromDatePicker.inputDate(getDateParts(date));
    }

    async setHolidayEndDate(date: Date) {
        await this.holidayToDatePicker.inputDate(getDateParts(date));
    }

    private get holidayFromDatePicker() {
        const datePicker = this.page.getByPlaceholder('Select start day');

        return new ReactDatePickerHasArrowsControl(datePicker);
    }

    private get holidayToDatePicker() {
        const datePicker = this.page.getByPlaceholder('Select end day');

        return new ReactDatePickerHasArrowsControl(datePicker);
    }

    private get requestTypeDropDown() {
        const dropdownLocator = this.page.getByTestId('requestTypeSelector');

        return new DropdownControl(dropdownLocator);
    }

    private get employeeSelectDropDown() {
        const dropdownLocator = this.page.locator('div[class*="employee-selector"]');

        return new DropdownControl(dropdownLocator);
    }

    private get countryDropDown() {
        const dropdownLocator = this.page.getByTestId('workAbroadCountrySelect').filter({
            hasNot: this.page.locator('[class*=is-disabled]'),
        });

        return new DropdownControl(dropdownLocator);
    }
}
