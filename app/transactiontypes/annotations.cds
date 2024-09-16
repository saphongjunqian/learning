using ac.finance.service.DocumentsService as service from '../../srv/document-srv';

// Annoation for Text
annotate service.TransactionTypes {
    @Common          : {
        SemanticObject: 'TransactionTypes',
        Text          : name
    }

    @Common.Label: 'Name'
    name;

    @Common.Label: 'Description'
    descr;

    @Common.Label: 'Transaction Type'
    TransactionType;

    @Common.Label: 'Direction'
    @Common.Text: Direction.name
    @Common.TextArrangement: #TextOnly
    Direction;

    @Common.Label: 'Organization'
    @Common          : {
        Text           : Organization.name,
        TextArrangement: #TextFirst
    }
    Organization;
};

// UI Annotations
annotate service.TransactionTypes with @(UI: {
    SelectionFields : [
        name,
        descr,
        TransactionType,
        Organization_ID,
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
            Value : TransactionType,
        },
        {
            $Type : 'UI.DataField',
            Value : Organization_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : Direction_Direction,
        }
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
                Value : TransactionType,
            },
            {
                $Type : 'UI.DataField',
                Value : Organization_ID,
            },
            {
                $Type : 'UI.DataField',
                Value : Direction_Direction,
            }
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
