import { Controller } from '@nestjs/common';

import { getArgs } from './common/utils/common';

/**
 * Note: This will return `undefined` for development environments, but that is
 * acceptable behavior as the `dotenv` package will still load the `.env` file
 * as expected. In production, however, the `--env` flag must be defined.
 */
const envPath = getArgs().env;
require('dotenv').config({ path: envPath });

@Controller()
export class AppController {
  constructor() {}
}
