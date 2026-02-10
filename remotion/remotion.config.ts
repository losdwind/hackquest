import path from 'node:path';
import {Config} from '@remotion/cli/config';

Config.setPublicDir(path.resolve(__dirname, '..', 'courses'));
