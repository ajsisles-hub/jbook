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

      // Handle root index.js
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });


      //Fallback cache check for any path
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cacheResult = await
          fileCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cacheResult) {
          return cacheResult;
        }
      });

      // Handle CSS File
      build.onLoad({ filter: /\.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents =
          `const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
          ` ;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      // Handle JS/JSX files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

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