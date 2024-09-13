sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'aclearning/wordcollection/test/integration/FirstJourney',
		'aclearning/wordcollection/test/integration/pages/WordCollectionList',
		'aclearning/wordcollection/test/integration/pages/WordCollectionObjectPage'
    ],
    function(JourneyRunner, opaJourney, WordCollectionList, WordCollectionObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('aclearning/wordcollection') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheWordCollectionList: WordCollectionList,
					onTheWordCollectionObjectPage: WordCollectionObjectPage
                }
            },
            opaJourney.run
        );
    }
);