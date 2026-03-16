### Assignment 1 — AI Self-Review
Goal: Use the “Self-Review” prompt to analyze one AI-generated refactor before committing it.
Steps:
Copy the generated file and pass it to AI with the Self-Review prompt.
Read the AI’s review, confirm or reject its observations.
Apply any suggested improvements manually.
Expected result: A verified, self-reviewed code snippet that passes both static checks and human review.

### prompt

You are a Senior QA Automation Engineer.

Goal:
Review the following AI-generated code for correctness and consistency before integration.

Inputs:
"import { Page } from '@playwright/test';

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
}"


Check:
1) Does it preserve original logic and test flow?
2) Are selectors stable and correctly scoped?
3) Are all imports valid and paths real?
4) Any naming inconsistencies or typos?
5) Suggest fixes if necessary.

Output:
A structured "Self-Review Report" listing issues, risks, and recommendations.