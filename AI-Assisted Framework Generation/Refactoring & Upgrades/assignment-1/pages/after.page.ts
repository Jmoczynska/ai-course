import { Page } from '@playwright/test';

import { ActionsAntControl } from '../../controls/actions.ant.control';
import { DropdownAntControl } from '../../controls/dropdown.ant.control';
import { TabNavigationControl } from '../../controls/tab-navigation.control';
import { TableAntControl } from '../../controls/table.ant.control';
import { DeskBookingTab } from '../../types/tab-navigation.types';
import { BasePage } from '../base.page';

export class DeskBookingAdminPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get tabNavigationControl() {
        return new TabNavigationControl<DeskBookingTab>(this.page.getByRole('navigation'));
    }

    get createNewRoomButton() {
        return this.page.getByRole('button', { name: 'CREATE NEW ROOM', exact: true });
    }

    getDeskBookingRoomActionsControl(row: number = 0) {
        const actionsButtonLocator = this.deskBookingRoomTable.getRow(row).getByRole('button', { name: 'more' });
        const actionsButtonCellLocator = this.deskBookingRoomTable.getCell(row, 6);
        return new ActionsAntControl(actionsButtonLocator, actionsButtonCellLocator);
    }

    getGroupRoomByNumber(roomNumber: number) {
        return this.deskBookingRoomTable.rows.filter({
            has: this.page.getByRole('cell', { name: roomNumber.toString() }),
        });
    }

    getVisibilityCheckbox(rowNumber: number = 0) {
        return this.deskBookingRoomTable.getRow(rowNumber).getByRole('checkbox');
    }

    async filterRoomsByOffice(roomOffice: string) {
        await this.filterRoomsBy(this.selectOfficeDropdown, roomOffice);
    }

    async filterRoomsByFloor(roomFloor: number) {
        await this.filterRoomsBy(this.selectFloorDropdown, roomFloor);
    }

    async filterRoomsByNumber(roomNumber: number) {
        await this.filterRoomsBy(this.selectRoomDropdown, roomNumber);
    }

    async filterRoomsByType(roomType: string) {
        await this.filterRoomsBy(this.selectRoomTypeDropdown, roomType);
    }

    async filterRoomsBy(dropdown: DropdownAntControl, value: string | number) {
        await this.filtersButton.click();
        await dropdown.selectOptionWithInput(value.toString());
        await this.filtersButton.click();
    }

    async waitForPageToLoad() {
        await this.createNewRoomButton.waitFor({ state: 'visible' });
    }

    private get filtersButton() {
        return this.page.getByRole('button', { name: 'Filters', exact: true });
    }

    private get selectOfficeDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-select').filter({ hasText: /^Select Office$/ }));
    }

    private get selectFloorDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-select').filter({ hasText: /^Select Floor$/ }));
    }

    private get selectRoomDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-select').filter({ hasText: /^Select Room$/ }));
    }

    private get selectRoomTypeDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-select').filter({ hasText: /^Select Room Type$/ }));
    }

    private get deskBookingRoomTable() {
        return new TableAntControl(this.page.locator('.ant-table-content > table'));
    }
}
