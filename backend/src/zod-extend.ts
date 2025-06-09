// See https://www.npmjs.com/package/@asteasolutions/zod-to-openapi#using-schemas-vs-a-registry
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);
