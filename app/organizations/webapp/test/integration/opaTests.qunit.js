sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'acfinance/organizations/test/integration/FirstJourney',
		'acfinance/organizations/test/integration/pages/OrganizationsList',
		'acfinance/organizations/test/integration/pages/OrganizationsObjectPage',
		'acfinance/organizations/test/integration/pages/OrganizationMembersObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrganizationsList, OrganizationsObjectPage, OrganizationMembersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('acfinance/organizations') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrganizationsList: OrganizationsList,
					onTheOrganizationsObjectPage: OrganizationsObjectPage,
					onTheOrganizationMembersObjectPage: OrganizationMembersObjectPage
                }
            },
            opaJourney.run
        );
    }
);