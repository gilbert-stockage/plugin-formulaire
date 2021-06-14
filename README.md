# Gilbert Wordpress Plugin

Composant web basé sur Vue 3 et Tailwindcss.

## Marche à suivre

1. Builder l'app avec la commande:

```
npm run build --target wc --name gilbert-plugin 'src/App.vue'
```

2. Remplacer le dossier dist dans le WordPress (local ou prod).

3. (Si première fois) importez le dossier wp-plugin (comprenant /plugins, app.js, ga.js et index.php) dans le plugin en question sur WordPress.

## Lancer en local
```
npm run install && npm run dev
```

### Vue.config.js

La destination du build "dist" est dans ce dossier. Mais si vous avez une instance WordPress locale, veuillez changer la destination.

Par exemple:
```
module.exports = {
  outputDir: './dist',
}
```

## Google Analytics
```
'send', 'event', `Question ${this.currentStep}`
```