import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@/utils': `${__dirname}/utils`,
  '@/middleware': `${__dirname}/middleware`,
  '@/resources': `${__dirname}/resources`,
});