using ac.finance.service.AccountsService as service from '../../srv/account-srv';

// Annoation for Text
annotate service.AccountCategories {
    @Common          : {
        SemanticObject: 'AccountCategories',
        Text          : name
    }

    @Common.Label: 'Name'
    name;

    @Common.Label: 'Description'
    descr;

    @Common.Label: 'Category'
    Category;

    @Common.Label: 'Organization'
    @Common          : {
        Text           : Organization.name,
        TextArrangement: #TextFirst
    }
    Organization;

    @Common.Label: 'Exclude from Income/Expense Report'
    ExcludedFromIEReport;

    @Common.Label: 'Exclude from Balance Report'
    ExcludedFromBSReport
};

// UI Annotations
annotate service.AccountCategories with @(UI: {
    SelectionFields : [
        name,
        descr,
        Category,
        Organization_ID,
        ExcludedFromIEReport,
        ExcludedFromBSReport
    ],
    LineItem : [
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : descr,
        },
        {
            $Type : 'UI.DataField',
            Value : Category,
        },
        {
            $Type : 'UI.DataField',
            Value : Organization_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : ExcludedFromBSReport,
        },
        {
            $Type : 'UI.DataField',
            Value : ExcludedFromIEReport,
        },
    ],
    HeaderInfo         : {
        TypeName      : 'AccountCategory',
        TypeNamePlural: 'AccountCategories',
        Title         : {Value: name},
        Description   : {Value: descr}
    },
    FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Value : descr,
            },
            {
                $Type : 'UI.DataField',
                Value : Category,
            },
            {
                $Type : 'UI.DataField',
                Value : Organization_ID,
            },
            {
                $Type : 'UI.DataField',
                Value : ExcludedFromBSReport,
            },
            {
                $Type : 'UI.DataField',
                Value : ExcludedFromIEReport,
            },
        ],
    },
    Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
});
