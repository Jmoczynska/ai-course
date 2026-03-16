import { Page } from '@playwright/test';

import { DropdownAntControl } from '../../controls/dropdown.ant.control';
import { TabNavigationControl } from '../../controls/tab-navigation.control';
import { CreateRewardRequestTab } from '../../types/tab-navigation.types';
import { BasePage } from '../base.page';

export class AddTeamRewardRequestPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get createRequestButton() {
        return this.page.getByRole('button', { name: 'CREATE REQUEST' });
    }

    get commentInput() {
        return this.page.getByRole('textbox', { name: 'Leave a comment' }).first();
    }

    get noteForProgramCoordinatorInput() {
        return this.page.getByRole('textbox', { name: 'Leave a comment' }).nth(1);
    }

    get teamLunchRewardType() {
        return this.page.getByRole('button', { name: 'Team Lunch' });
    }

    get travelBagRewardType() {
        return this.page.getByRole('button', { name: 'Travel bag' });
    }

    get createRewardRequestTabControl() {
        return new TabNavigationControl<CreateRewardRequestTab>(this.page.getByRole('tablist'), 'tab');
    }

    //  ================ added ===============

    async goToTeamRewardRequestTab() {
        await this.createRewardRequestTabControl.goTo('Team');
    }
    //  ===============================

    async selectTeam(value: string) {
        await this.teamDropdown.selectOption(value);
    }

    async selectProject(value: string) {
        await this.projectDropdown.selectOption(value);
    }

    async selectEmployee(value: string) {
        await this.employeeDropdown.selectOption(value);
    }

    //  ================ added ===============
    async chooseTeamLunchRewardType() {
        await this.teamLunchRewardType.click();
    }

    async chooseTravelBagRewardType() {
        await this.travelBagRewardType.click();
    }

    async fillCommentAndNoteForProgramCoordinator(comment: string, noteForProgramCoordinator: string) {
        await this.commentInput.fill(comment);
        await this.noteForProgramCoordinatorInput.fill(noteForProgramCoordinator);
    }

    async submitRequestAndWaitForClose() {
        await this.createRequestButton.click();
        await this.createRequestButton.waitFor({ state: 'hidden' });
    }

    async submitRequest() {
        await this.createRequestButton.click();
    }
    //  ===============================

    private get teamDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-form-item').filter({ hasText: 'Select Team' }).locator('.ant-select-selector'));
    }

    private get projectDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-form-item').filter({ hasText: 'Select Project' }).locator('.ant-select-selector'));
    }

    private get employeeDropdown() {
        return new DropdownAntControl(this.page.locator('.ant-form-item').filter({ hasText: 'Select Employee' }).locator('.ant-select-selector'));
    }
}
