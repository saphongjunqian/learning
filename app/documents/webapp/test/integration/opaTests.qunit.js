sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'acfinance/documents/test/integration/FirstJourney',
		'acfinance/documents/test/integration/pages/DocumentsList',
		'acfinance/documents/test/integration/pages/DocumentsObjectPage',
		'acfinance/documents/test/integration/pages/DocumentItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, DocumentsList, DocumentsObjectPage, DocumentItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('acfinance/documents') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDocumentsList: DocumentsList,
					onTheDocumentsObjectPage: DocumentsObjectPage,
					onTheDocumentItemsObjectPage: DocumentItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);