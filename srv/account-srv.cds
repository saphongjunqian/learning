using { ac.finance.db as db } from '../db/schema';
namespace ac.finance.service;

service AccountsService {
  entity AccountCategories as projection on db.AccountCategories;
  entity Accounts as projection on db.Accounts;
}

annotate AccountsService.AccountCategories with @odata.draft.enabled;
annotate AccountsService.Accounts with @odata.draft.enabled;
