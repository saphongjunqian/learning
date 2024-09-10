sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'aclearning.accounts',
            componentId: 'AccountsObjectPage',
            entitySet: 'Accounts'
        },
        CustomPageDefinitions
    );
});