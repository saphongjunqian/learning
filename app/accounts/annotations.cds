using AccountsService as service from '../../srv/account-srv';

// Annoation for Text
annotate service.Accounts {
    @Common          : {
        SemanticObject: 'Accounts',
        Text          : name
    }

    @Common.Label: 'Name'
    name;

    @Common.Label: 'Description'
    descr;

    @Common.Label: 'Category'
    Category;

    @Common.Label: 'Expired'
    Expired;
};

// UI Annotations
annotate service.Accounts with @(UI: {
    SelectionFields : [
        name,
        descr,
        Category_Category,
        Expired,
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
            Value : Category_Category,
        },
        {
            $Type : 'UI.DataField',
            Value : Expired,
        }
    ],
    HeaderInfo         : {
        TypeName      : 'Account',
        TypeNamePlural: 'Accounts',
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
                Value : Category_Category,
            },
            {
                $Type : 'UI.DataField',
                Value : Expired,
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

