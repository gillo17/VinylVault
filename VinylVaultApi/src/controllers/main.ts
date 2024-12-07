import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';

@Controller()
class MainController {
    @Route('get', '/healthcheck')
    getHealthCheck(req: Request, res: Response, next: NextFunction) {
        logging.info('MainController: Healthcheck - All Clear');
        return res.status(200).json({ message: 'All Clear' });
    }
}
export default MainController;
