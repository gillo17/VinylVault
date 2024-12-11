import { Request, Response } from 'express';

import { Controller } from '../helpers/decorators/controller';
import { Route } from '../helpers/decorators/route';
import { PartyService } from '../services/partyService';
import { AccountCreationValidator } from '../helpers/validators/accountCreationValidator';
import { inject } from 'inversify';
import { UserAccountMapper } from '../mappers/userAccountMapper';
import { userAccountInterface } from '../interfaces/userAccountInterface';

@Controller()
export class PartyController {

    public constructor(
        @inject(PartyService) private partyService: PartyService,
        @inject(AccountCreationValidator) private accountCreationValidator: AccountCreationValidator,
        @inject(UserAccountMapper) private userAccountMapper: UserAccountMapper   
    ) {}
    
    @Route('post', '/create-account')
    createAccount(req: Request, res: Response) {

        const accountDetails: userAccountInterface = this.userAccountMapper.mapToUserAccount(req.body);
        
        const validationError = this.accountCreationValidator.validateCreateAccountInfo(accountDetails);

        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        this.partyService.createAccount(accountDetails);

        return res.status(200).json({ message: req.body });
    }
}
