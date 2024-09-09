using WordCollectionService as service from '../../srv/word-collection-service';

// Enable Draft
annotate service.WordCollection with @odata.draft.enabled;

// Annoation for Text
annotate service.WordCollection {
    @Common          : {
        SemanticObject: 'TestCases',
        Text          : name
    }

    @Common.Label: 'Name'
    name;

    @Common.Label: 'Description'
    descr;

    @Common.Label: 'Details'
    Details;

    @Common.Label: 'Cover'
    Cover;

    @Common.Label: 'Text File'
    TextFile;
};

// UI Annotations
annotate service.WordCollection with @(UI: {
    SelectionFields : [
        name,
        descr,
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
    ],
    HeaderInfo         : {
        TypeName      : 'Word Collection',
        TypeNamePlural: 'Word Collections',
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
                Value : Details,
            },
            {
                $Type : 'UI.DataField',
                Value : Cover,
            },
            {
                $Type : 'UI.DataField',
                Value : TextFile,
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
