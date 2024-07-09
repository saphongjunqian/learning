sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ac/wordcollection/test/integration/FirstJourney',
		'ac/wordcollection/test/integration/pages/WordCollectionList',
		'ac/wordcollection/test/integration/pages/WordCollectionObjectPage'
    ],
    function(JourneyRunner, opaJourney, WordCollectionList, WordCollectionObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ac/wordcollection') + '/index.html'
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