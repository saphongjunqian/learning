using ac.finance.service.DocumentsService as service from '../../srv/document-srv';

annotate service.Documents {
    @Common          : {
        SemanticObject: 'Documents',
        Text          : Description
    }
    @Common.Label: 'Number'
    DocumentNumber;

    @Common.Label: 'Organization'
    @Common          : {
        Text           : Organization.name,
        TextArrangement: #TextFirst
    }
    Organization;


    @Common.Label: 'Description'
    Description;

    @Common.Label: 'Posting Date'
    PostingDate;

    @Common.Label: 'Items'
    Items;
};

annotate service.DocumentItems with {
    @Common.Label: 'Document Header'
    DocumentHeader;

    @Common.Label: 'Document Line Item'
    DocumentLineItem;

    @Common.Label: 'Account'
    @Common          : {
        Text           : Account.name,
        TextArrangement: #TextFirst
    }
    Account;

    @Common.Label: 'Amount'
    Amount;

    @Common.Label: 'Currency'
    @Common          : {
        Text           : Currency.name,
        TextArrangement: #TextFirst
    }
    Currency;

    @Common.Label: 'Transaction Type'
    @Common          : {
        Text           : TransactionType.name,
        TextArrangement: #TextFirst
    }
    TransactionType;

    @Common.Label: 'Description'
    Description;
}

annotate service.Documents with @(
    UI.SelectionFields : [
        Organization_ID,
        DocumentNumber,
        PostingDate,
        Description,
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : Organization_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : DocumentNumber,
        },
        {
            $Type : 'UI.DataField',
            Value : PostingDate,
        },
        {
            $Type : 'UI.DataField',
            Value : Description,
        }
    ],
    HeaderInfo                  : {
        Title         : {
            $Type: 'UI.DataField',
            Value: DocumentNumber,
        },
        TypeName      : 'Document',
        TypeNamePlural: 'Documents',
        Description   : {
            $Type: 'UI.DataField',
            Value: Description,
        },
    },
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Organization_ID,
            },
            {
                $Type : 'UI.DataField',
                Value : DocumentNumber,
            },
            {
                $Type : 'UI.DataField',
                Value : PostingDate,
            },
            {
                $Type : 'UI.DataField',
                Value : Description,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'Items',
            Target: 'Items/@UI.LineItem',
            Label : 'Items'
        },
    ]
);

annotate service.DocumentItems with @(
    UI.SelectionFields : [
        DocumentLineItem,
        Account_ID,
        TransactionType_TransactionType,
        Amount,
        Currency_code,
        Description,
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : DocumentLineItem,
        },
        {
            $Type : 'UI.DataField',
            Value : Account_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : TransactionType_TransactionType,
        },
        {
            $Type : 'UI.DataField',
            Value : Amount,
        },
        {
            $Type : 'UI.DataField',
            Value : Currency_code,
        },
        {
            $Type : 'UI.DataField',
            Value : Description,
        }
    ],
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : DocumentLineItem,
            },
            {
                $Type : 'UI.DataField',
                Value : Account_ID,
            },
            {
                $Type : 'UI.DataField',
                Value : TransactionType_TransactionType,
            },
            {
                $Type : 'UI.DataField',
                Value : Amount,
            },
            {
                $Type : 'UI.DataField',
                Value : Currency_code,
            },
            {
                $Type : 'UI.DataField',
                Value : Description,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
