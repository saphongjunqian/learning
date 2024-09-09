using { Currency, cuid, managed, sap, User } from '@sap/cds/common';
namespace alvachien.learning.organization;

entity Organizations : cuid, managed, sap.common.CodeList {
    Host  : User @cds.on.insert : $user @cds.on.update : $user;
    Currency: Currency;
}

