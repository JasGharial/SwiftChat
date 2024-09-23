import { ErrnoException } from "../types/errors/server.errors";

// Handle Server Port To Run Application
export const normalizePort = (port_val: string) => {
  const port = parseInt(port_val, 10);

  if(isNaN(port)) {
    return port_val;
  }

  if(port > 10) {
    return port;
  }

  throw "Please Specify Port"
}

export const onError = (error: ErrnoException, port: number | string) => {
  if( error.syscall !== 'listen' ) {
    throw error;
  }

  const bind = typeof(port) === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch(error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
}
