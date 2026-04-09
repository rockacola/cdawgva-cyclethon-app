import { createRequire } from 'module';

import type { NextConfig } from 'next';

const require = createRequire(import.meta.url);
const { version } = require('./package.json');

const nextConfig: NextConfig = {
  env: {
    APP_VERSION: version,
  },
  images: {
    remotePatterns: [{ hostname: 'img.youtube.com', protocol: 'https' }],
  },
};

export default nextConfig;
