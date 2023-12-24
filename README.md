# Split model viewer

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a9dfe7f-9676-4ac4-a844-dd161e3f9b21/deploy-status)](https://app.netlify.com/sites/glb-split-viewer/deploys)

https://glb-split-viewer.netlify.app/

## TODO

High priority:

- [x] Button to quickly preview helmet assets
- [ ] environment tweaks (env preset, lights tweaking, tonemapping, camera fov, ...)
- [ ] filename text
- [ ] warn if filename for 2 glbs is equal
- [ ] anti aliasing?
- [ ] model stats (vertices, file weight, texture sizes, materials, ...)
- [ ] camera fit on model load
- [ ] camera stats

Nice to have:

- [ ] configurable horizontal split range
- [ ] UI to drag n drop models
- [ ] Show objects with 2 different cameras (so that they are synced and they are 100% visible at
      all times)
- [ ] button: swap left/right models

## Setup and run

```sh
# make sure to have corepack enabled
corepack enable

yarn # should use yarn version specified in package.json
yarn dev
```

## License

MIT

## Credits

- Helmet model: https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/DamagedHelmet
- Don McCurdy:
  - https://gltf.report/
  - https://gltf-transform.dev/
