using { alvachien.learning.accounts as db } from '../db/schema';

service OrgService {
  entity Organizations as projection on db.Organizations;
}

annotate OrgService.Organizations with @odata.draft.enabled;
