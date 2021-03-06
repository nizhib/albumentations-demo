# Albumentations Demo

## Easy setup

```bash
docker-compose up
```

## Backend-only

```bash
python3 -m pip install -r back/requirements.txt
python3 back/app.py
```

## Frontend-only

### Install dependencies
```bash
yarn --cwd front install
```

### Compile and hot-reload for development
```bash
yarn --cwd front run serve
```

### Compile and minify for production
```bash
yarn --cwd front run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## References

* [albumentations](https://github.com/albu/albumentations) — fast image augmentation library
* [vue.js](https://vuejs.org/) — progressive js framework
* [bulma](https://bulma.io/) — css framework based on flexbox
* [traefik](https://traefik.io/) — cloud native edge router
