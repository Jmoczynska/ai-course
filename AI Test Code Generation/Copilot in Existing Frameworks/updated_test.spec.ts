import { expect } from '@playwright/test';

import { HOLIDAYS_ADC_STORAGE_PATH } from '../../../constants/shared-context.constants';
import { test } from '../../../fixtures/gcp.fixtures';
import { subWorkingDays, toISODateOnly } from '../../../utils/date.utils';
import { holidaysTag, regressionTag, sickLeaveTag, smokeTag } from '../../../utils/tags.utils';
import { getEmployeeFullName } from '../../../utils/user.utils';

const testId = '@41669';

test.use({ storageState: HOLIDAYS_ADC_STORAGE_PATH });

test(
    'Verify ADC is able to create Sick Leave request with MC in the past for PL B2B Employee',
    { tag: [smokeTag, regressionTag, holidaysTag, sickLeaveTag, testId] },
    async ({
        mainPage,
        holidaysTeamRequestsPage,
        holidaysMyRequestsPage,
        holidaysRaiseRequestPage,
        holidaysService,
        projectsService,
        createPersonService,
        holidaysADCUser,
    }) => {
        const publicHolidays = await holidaysService.getAllPublicHolidaysByCalendar(holidaysADCUser.calendar);
        const today = new Date();
        const requestDate = subWorkingDays(today, 1, publicHolidays);

        test.skip(
            requestDate.getMonth() !== today.getMonth(),
            "Test should be skipped if today's month isn't the same as request's fromDate, " +
                'because past sick leave can be created only in actual month',
        );

        const userModel = await test.step('Given there is a PL B2B Employee in project with ADC', async () => {
            const userModel = await createPersonService.createPerson();

            const project = await projectsService.createProject();
            await projectsService.addProjectAssignment(project.id, project.clientId, {
                personId: holidaysADCUser.id,
                projectRole: 'AGILE_DELIVERY_COORDINATOR',
            });
            await projectsService.addProjectAssignment(project.id, project.clientId, { personId: userModel.id });

            return userModel;
        });

        const employeeFullName = getEmployeeFullName(userModel.enName);

        await test.step('When ADC creates Sick Leave with MC in the past for the Employee', async () => {
            await mainPage.goToModule('Holidays');

            await holidaysMyRequestsPage.tabNavigationControl.goTo('Team');
            await holidaysTeamRequestsPage.raiseRequestButton.click();
            await holidaysRaiseRequestPage.selectAssociate(employeeFullName);
            await holidaysRaiseRequestPage.selectRequestType('Sick leave');
            await holidaysRaiseRequestPage.medicalCertificateAvailableCheckbox.click();

            await holidaysRaiseRequestPage.setHolidayStartDate(requestDate);
            await holidaysRaiseRequestPage.setHolidayEndDate(requestDate);
            await holidaysRaiseRequestPage.createRequestButton.click();
            await holidaysRaiseRequestPage.yesContinueButton.click();
        });

        await test.step('Then the request should be displayed on Team tab', async () => {
            await holidaysTeamRequestsPage.refreshTeamPageAfterChanges();
            const isFilterButtonVisible = await holidaysTeamRequestsPage.isFilterButtonVisible();
            if (isFilterButtonVisible) {
                await holidaysTeamRequestsPage.clearFilterStatusAndChooseEmployee(employeeFullName);
            }

            await expect(holidaysTeamRequestsPage.getTeamRequestStatusCell()).toContainText('In review by accountant');
            await expect(holidaysTeamRequestsPage.getTeamRequestFromDateCell()).toContainText(toISODateOnly(requestDate));
            await expect(holidaysTeamRequestsPage.getTeamRequestToDateCell()).toContainText(toISODateOnly(requestDate));
            await expect(holidaysTeamRequestsPage.getTeamRequestDurationCell()).toHaveText('1');
        });
    },
);
