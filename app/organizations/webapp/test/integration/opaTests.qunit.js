sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'aclearning/organizations/test/integration/FirstJourney',
		'aclearning/organizations/test/integration/pages/OrganizationsList',
		'aclearning/organizations/test/integration/pages/OrganizationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrganizationsList, OrganizationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('aclearning/organizations') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrganizationsList: OrganizationsList,
					onTheOrganizationsObjectPage: OrganizationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);