// @flow

export type DependencySet = {
  [key: string]: string
};

export type Scripts = {
  [script: string]: string
};

export type JSONValue =
  | null
  | string
  | boolean
  | number
  | Array<JSONValue>
  | { [key: string]: JSONValue };

export type SpawnOpts = {
  orderMode?: 'serial' | 'parallel' | 'parallel-nodes',
  bail?: boolean
  // maxConcurrent?: number,
};

export type FilterOpts = {
  only?: Array<string>,
  ignore?: Array<string>,
  onlyFs?: Array<string>,
  ignoreFs?: Array<string>
};

export type Dependency = {
  name: string,
  version?: string
};

export type configDependencyType =
  | 'dependencies'
  | 'devDependencies'
  | 'peerDependencies'
  | 'optionalDependencies';
