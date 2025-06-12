import cors, { CorsOptions, CorsRequest } from 'cors';

const CORS_ORIGIN_SUFFIX = process.env.CORS_ORIGIN_SUFFIX!;

const dynamicCors = (req: CorsRequest, callback: (err: Error | null, corsOptions: CorsOptions) => void) => {
  const origin = req.headers.origin;
  if (!origin) {
    return callback(null, { origin: false });
  }

  const originUrl = new URL(origin);
  if (originUrl.hostname.endsWith(CORS_ORIGIN_SUFFIX)) {
    return callback(null, { origin: originUrl.origin, credentials: true });
  }
};

export default cors(dynamicCors);
