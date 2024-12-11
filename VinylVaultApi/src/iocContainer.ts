import { interfaces } from "inversify";
import { fluentProvide } from "inversify-binding-decorators";
import { Container } from 'inversify';
import { AccountCreationValidator } from './helpers/validators/accountCreationValidator';
import { PartyService } from './services/partyService';
import { PartyController } from './controllers/partyController';

const container = new Container();

container.bind<PartyService>(PartyService).toSelf();
container.bind<AccountCreationValidator>(AccountCreationValidator).toSelf();
container.bind<PartyController>(PartyController).toSelf();

export default container;