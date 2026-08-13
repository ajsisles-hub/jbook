import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';


export const fetchPlugin = (inputCode: string) => {

  const fileCache = localForage.createInstance({
    name: 'filecache'
  });

  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        const cacheResult = await
          fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cacheResult) {
          return cacheResult;
        }

        const { data, request } = await axios.get(args.path);
        console.log('data', data);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    }

  }
} 