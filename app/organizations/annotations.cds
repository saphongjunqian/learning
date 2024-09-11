using ac.finance.service.OrgService as service from '../../srv/org-srv';

// Annoation for Text
annotate service.Organizations {
    @Common          : {
        SemanticObject: 'Accounts',
        Text          : name
    }

    @Common.Label: 'Name'
    name;

    @Common.Label: 'Description'
    descr;

    @Common.Label: 'Members'
    Members;

    @Common.Label: 'Currency'
    Currency;

    @Common.Label: 'Host'
    Host;
};

annotate service.OrganizationMembers {
    @Common.Label: 'Organization'
    Organization;

    @Common.Label: 'Member'
    Member;
};

// UI Annotations
annotate service.Organizations with @(UI: {
    SelectionFields : [
        name,
        descr,
        Host,
        Currency_code,
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
            Value : Currency_code,
        },
        {
            $Type : 'UI.DataField',
            Value : Host,
        }
    ],
    HeaderInfo         : {
        TypeName      : 'Organization',
        TypeNamePlural: 'Organizations',
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
                Value : Host,
            },
            {
                $Type : 'UI.DataField',
                Value : Currency_code,
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

