namespace ac.englishdictation;

using { cuid, managed, sap } from '@sap/cds/common';

entity WordCollection : cuid, managed, sap.common.CodeList {
    Details : LargeString @Core.MediaType: 'application/json';
    Cover: LargeBinary @Core.MediaType: 'image/jpeg';
    TextFile: LargeString @Core.MediaType: 'text/plain';
}
