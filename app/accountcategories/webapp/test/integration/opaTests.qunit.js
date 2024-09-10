sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'aclearning/accountcategories/test/integration/FirstJourney',
		'aclearning/accountcategories/test/integration/pages/AccountCategoriesList',
		'aclearning/accountcategories/test/integration/pages/AccountCategoriesObjectPage'
    ],
    function(JourneyRunner, opaJourney, AccountCategoriesList, AccountCategoriesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('aclearning/accountcategories') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAccountCategoriesList: AccountCategoriesList,
					onTheAccountCategoriesObjectPage: AccountCategoriesObjectPage
                }
            },
            opaJourney.run
        );
    }
);