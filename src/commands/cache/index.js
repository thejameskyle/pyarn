// @flow
import * as options from '../../utils/options';
import { BoltError } from '../../utils/errors';
const commands = {
  clean: require('./clean').cacheClean,
  dir: require('./dir').cacheDir,
  list: require('./list').cacheList
};

export async function cache(
  flags: options.Flags,
  commandArgs: Array<string>,
  subCommand: string,
  subCommandArgs: Array<string>
) {
  if (commands[subCommand]) {
    return await commands[subCommand](flags, subCommandArgs);
  }

  throw new BoltError(`Invalid subcommand. Try "ls, list, dir, clean"`);
}
