// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';
// import { enableProdMode } from '@angular/core';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as cors from 'cors';
// import * as compression from 'compression';

// import { join } from 'path';

// enableProdMode();

// export const app = express();
// global['Event'] = null;
// app.use(compression());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // const DIST_FOLDER = join(process.cwd(), 'dist');

// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

// app.set('view engine', 'html');
// app.set('views', './dist/browser');

// app.get('/redirect/**', (req, res) => {
//   const location = req.url.substring(10);
//   res.redirect(301, location);
// });

// app.get('*.*', express.static('./dist/browser', {
//   maxAge: '1y'
// }));

// app.get('/*', (req, res) => {
//   res.render('index', { req, res }, (err, html) => {
//     if (html) {
//       res.send(html);
//     } else {
//       console.error(err);
//       res.send(err);
//     }
//   });
// });

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();



// Express server
const app = express();
global['Event'] = null;
const PORT = process.env.PORT || 13247;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
const domino = require("domino");
const fs = require("fs");
const path = require("path");
const ROOT = path.join(path.resolve(__dirname, '..'));
const templateA = fs
  .readFileSync(path.join("dist/browser", "index.html"))
  .toString();
const win = domino.createWindow(templateA);

(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
win.Object = Object;
win.Math = Math;

global["window"] = win;
global["document"] = win.document;
global["branch"] = null;
global["object"] = win.object;

// app.use(require('prerender-node'));


app.route('/sitemap.xml')
  .get((req, res) => {
    console.log('dddddddddddddddddddd')
    res.sendFile(join(DIST_FOLDER, '/sitemap.xml'));
  });

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: REQUEST,
        useValue: options.req
      },
      {
        provide: RESPONSE,
        useValue: options.req.res,
      },
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

app.get('*', (req: express.Request, res: express.Response) => {
  res.render('index', {
    req,
    providers: [
      { provide: REQUEST, useValue: req },
    ]
  });
});


