import { Container } from 'inversify';
import { AccountCreationValidator } from './helpers/validators/accountCreationValidator';
import { PartyService } from './services/partyService';
import { TYPES } from './types';
import { UserAccountMapper } from './mappers/userAccountMapper';

const container = new Container();

container.bind<PartyService>(TYPES.PartyService).to(PartyService);
container.bind<AccountCreationValidator>(TYPES.AccountCreationValidator).to(AccountCreationValidator);
container.bind<UserAccountMapper>(TYPES.UserAccountMapper).to(UserAccountMapper);

export default container;