sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'acfinance/transactiontypes/test/integration/FirstJourney',
		'acfinance/transactiontypes/test/integration/pages/TransactionTypesList',
		'acfinance/transactiontypes/test/integration/pages/TransactionTypesObjectPage'
    ],
    function(JourneyRunner, opaJourney, TransactionTypesList, TransactionTypesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('acfinance/transactiontypes') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTransactionTypesList: TransactionTypesList,
					onTheTransactionTypesObjectPage: TransactionTypesObjectPage
                }
            },
            opaJourney.run
        );
    }
);