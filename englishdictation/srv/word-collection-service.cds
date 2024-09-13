using ac.englishdictation as db from '../db/wordcollection';

service WordCollectionService {
    entity WordCollection as projection on db.WordCollection;
}

annotate WordCollectionService.WordCollection with @odata.draft.enabled;
