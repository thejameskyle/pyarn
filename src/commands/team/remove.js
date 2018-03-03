// @flow
import * as options from '../../utils/options';
import * as npm from '../../utils/npm';
import { BoltError } from '../../utils/errors';

type TeamRemoveOptions = {
  cwd?: string,
  args: Array<string>
};

function toTeamRemoveOptions(
  args: options.Args,
  flags: options.Flags
): TeamRemoveOptions {
  return { cwd: options.string(flags.cwd, 'cwd'), args };
}

export async function teamRemove(flags: options.Flags, args: options.Args) {
  let opts = toTeamRemoveOptions(args, flags);
  let cwd = opts.cwd || process.cwd();
  try {
    await npm.cliCommand(cwd, 'team', ['rm', ...opts.args]);
  } catch (err) {
    throw new BoltError(err);
  }
}
