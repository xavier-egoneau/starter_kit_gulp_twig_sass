# Starter kit Design product
  
Gulp Workflow pour la création de pages statiques ou de gabarits de Design Product html/css/js utilisant le moteur de templates Twig & sass.


## Sommaire
1. [Prérequis](#requirements)
2. [Initialisation](#setting-up-workflow)
3. [Utilisation](#ui-workflow)
5. [Bonnes pratiques](#good-practices)



<a name="requirements"></a>
## Prérequis
Avant de commencer vous devez avoir les dépendences suivantes d'installées sur la machine.
You'll need to have the following items installed before getting started.

  * [Node.js](https://nodejs.org/en/download/).
  * [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start/)


<a name="setting-up-workflow"></a>
## Utilisation - Initialisation

* `cd src`
* `npm cache clean && npm install`



<a name="ui-workflow"></a>
## Utiliser le starter Kit

* `gulp`


### Récapitulatif des tâches gulp principales

On accède à la liste des tâches gulp disponibles et leur résumé à l'aide de la commande `gulp --tasks`.

  * Tâche principale comprenant toutes les automatisations   :   `gulp`
  * Tout supprimer et relancer le build des fichiers Html   :   `gulp clean_project`
  * Préparer les fichier html     :   `gulp clean_html`
  * Compiler sass     :   `gulp make_css`
  * Compiler twig     :   `gulp make_html`
  * Concaténer les js :   `gulp make_js`
  * Préparer les images :   `gulp make_img`
  * Préparer les svg :   `gulp make_svg`
  * Supprimer les couleurs sur les svg :   `make_svg_black`
  * déplacer le favicon à la racine :   `make_svg_black`






<a name="good-practices"></a>
## Bonnes pratiques (A modifier en fonction du projet )
* Ce project utilise Bootstrap v5.0.0 ... [Bootstrap doc](https://getbootstrap.com/)
* Ce project est Atomic ... [BEM](http://getbem.com/introduction/)
* ...
* Tester le code et passer la validation html
* Tester l'accessibility...

### Tools

* [Web developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=fr): Use for validate local HTML.
* [Wave](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh) : Use for test accessibility
* [IBM Equal Accessib](https://chrome.google.com/webstore/detail/ibm-equal-access-accessib/lkcagbfjnkomcinoddgooolagloogehp) : Use for test accessibility
* [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=fr) : Use for test performance