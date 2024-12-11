import { Request, Response, NextFunction } from 'express';
import { Controller } from '../helpers/decorators/controller';
import { Route } from '../helpers/decorators/route';

@Controller()
class MainController {
    @Route('get', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('MainController: Healthcheck - All Clear');
        return res.status(200).json({ message: 'All Clear' });
    }
}
export default MainController;
