import { option } from 'ts-option';
import { Container } from 'typescript-ioc';

import { app } from './app';
import { Logger } from './service/Logger';

const port = option(process.env.PORT).getOrElseValue('3000');

app.listen(port, () => {
  Container.get(Logger).info(
    `Example app listening at http://localhost:${port}`,
  );
});
