using { ac.finance.db as db } from '../db/schema';
namespace ac.finance.service;

service DocumentsService {
  entity TransactionTypes as projection on db.TransactionTypes;
  entity Documents as projection on db.Documents;
  entity DocumentItems as projection on db.DocumentItems;
}

annotate DocumentsService.TransactionTypes with @odata.draft.enabled;
annotate DocumentsService.Documents with @odata.draft.enabled;
