sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'aclearning/accounts/test/integration/FirstJourney',
		'aclearning/accounts/test/integration/pages/AccountsList',
		'aclearning/accounts/test/integration/pages/AccountsObjectPage'
    ],
    function(JourneyRunner, opaJourney, AccountsList, AccountsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('aclearning/accounts') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAccountsList: AccountsList,
					onTheAccountsObjectPage: AccountsObjectPage
                }
            },
            opaJourney.run
        );
    }
);