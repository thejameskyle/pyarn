// @flow
import { BoltError } from '../utils/errors';
import * as options from '../utils/options';
import * as yarn from '../utils/yarn';

export type InitOptions = {|
  cwd?: string,
  args: {
    private?: boolean,
    yes?: boolean
  }
|};

export function toInitOptions(
  args: options.Args,
  flags: options.Flags
): InitOptions {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args: options.toYarnInit(flags)
  };
}

export async function init(opts: InitOptions) {
  let cwd = opts.cwd || process.cwd();

  try {
    await yarn.init(cwd, opts.args);
  } catch (err) {
    throw new BoltError(`Unable to create new package due to: ${err}`);
  }
}
