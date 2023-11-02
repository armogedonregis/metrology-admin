const dev = process.env.NODE_ENV !== 'production';

export const isServerForService = dev ? "http://localhost:4000" : "";
