namespace ac.financesystem;

using {
    cuid,
    managed,
    sap,
    Currency
} from '@sap/cds/common';

type AccountCategoryType  : String(5);
type OrganizationIDType   : String(10);
type DocumentNumberType   : Integer;
type DocumentLineItemType : Integer;
type AmountType           : Decimal(14, 2);

entity AccountCategories : sap.common.CodeList {
    key Category             : AccountCategoryType;
        ExcludedFromIEReport : Boolean;
        ExcludedFromBSReport : Boolean;
}

entity Accounts : cuid, managed, sap.common.CodeList {
    @assert.notNull
    Category : Association to AccountCategories;
    Expired  : Boolean;
}

@assert.unique: {fidoc_id: [
    OrganizationID,
    DocumentNumber
], }
entity AccountingDocuments : cuid {
    OrganizationID : OrganizationIDType;
    DocumentNumber : DocumentNumberType;
    PostingDate    : Date;

    Items          : Composition of many AccountingDocumentItems
                         on Items.DocumentHeader = $self;
}

@assert.unique: {fidocitem_id: [
    DocumentHeader,
    DocumentLineItem
], }
entity AccountingDocumentItems : cuid {
    DocumentHeader   : Association to AccountingDocuments not null;

    @assert.notNull
    DocumentLineItem : DocumentLineItemType;
    @assert.notNull
    Account          : Association to Accounts;
    @assert.notNull
    Amount           : AmountType;
    @assert.notNull
    Currency         : Currency;
}
