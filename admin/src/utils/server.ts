const dev = process.env.NODE_ENV !== 'production';

export const isServerForService = dev ? "http://localhost:4000" : "http://45.9.41.151:4000";
