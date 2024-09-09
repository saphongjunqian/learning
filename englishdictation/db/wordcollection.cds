namespace ac.englishdictation;

using { cuid, managed, sap } from '@sap/cds/common';

entity WordCollection : cuid, managed, sap.common.CodeList {
    Details : LargeBinary @Core.MediaType: 'application/json';
    Cover: LargeBinary  @Core.MediaType: 'image/jpeg';
}
