namespace ac.finance.db;

using {
    cuid,
    managed,
    sap,
    User,
    Currency,
} from '@sap/cds/common';

type AccountCategoryType : String(5);
type OrganizationIDType  : String(10);
type DocumentNumberType   : Integer;
type DocumentLineItemType : Integer;
type AmountType          : Decimal(14, 2);
type TransactionTypeType : String(5);

entity Organizations : cuid, managed, sap.common.CodeList {
    Host     : User  @cds.on.insert: $user  @cds.on.update: $user;
    Currency : Currency;
    Members  : Composition of many OrganizationMembers
                   on Members.Organization = $self;
}

entity OrganizationMembers : cuid, managed {
    @assert.notNull
    Organization : Association to Organizations;

    @assert.notNull
    Member       : User;
}

entity AccountCategories : managed, sap.common.CodeList {
    key Category             : AccountCategoryType;
        Organization         : Association to Organizations;
        ExcludedFromIEReport : Boolean;
        ExcludedFromBSReport : Boolean;
}

entity Accounts : cuid, managed, sap.common.CodeList {
    @assert.notNull
    Organization : Association to Organizations;

    @assert.notNull
    Category     : Association to AccountCategories;
    Expired      : Boolean;
}

entity TransactionDirections: sap.common.CodeList {
    key Direction : String(1);
}

entity TransactionTypes : managed, sap.common.CodeList {
    key TransactionType : TransactionTypeType;
        @assert.notNull
        Direction       : Association to TransactionDirections;
        Organization    : Association to Organizations;
        ParentType      : Association to TransactionTypes;
}

@assert.unique: {fidoc_id: [
    Organization,
    DocumentNumber
], }
entity Documents : cuid {
    @assert.notNull
    Organization   : Association to Organizations;
    @assert.notNull
    DocumentNumber : DocumentNumberType;
    @assert.notNull
    PostingDate    : Date;
    Description    : String(255);

    Items          : Composition of many DocumentItems
                         on Items.DocumentHeader = $self;
}

@assert.unique: {fidocitem_id: [
    DocumentHeader,
    DocumentLineItem
], }
entity DocumentItems : cuid {
    DocumentHeader   : Association to Documents not null;

    @assert.notNull    
    DocumentLineItem : DocumentLineItemType;
    @assert.notNull
    Account          : Association to Accounts;
    @assert.notNull
    TransactionType  : Association to TransactionTypes;
    @assert.notNull
    Amount           : AmountType;
    @assert.notNull
    Currency         : Currency;
    Description      : String(255);
}
