using { ac.finance.db as db } from '../db/schema';
namespace ac.finance.service;

service OrgService {
  entity Organizations as projection on db.Organizations;
}

annotate OrgService.Organizations with @odata.draft.enabled;
