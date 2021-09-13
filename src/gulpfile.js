//global
const { gulp, watch, series,src,dest, task, parallel } = require('gulp');
const config        = require('./config.json');
const pump = require('pump');
var plumber = require('gulp-plumber');

//notifs
const notify = require("gulp-notify");

//clean 
const del  = require('del');

//css
const minifyCSS = require('gulp-csso');
const sass = require('gulp-sass')(require('node-sass'));
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');

//js
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const order = require("gulp-order");
const concat = require('gulp-concat');

/* html/twig */
var twig = require('gulp-twig');
const twigMarkdown  = require('twig-markdown');
const prettify      = require('gulp-jsbeautifier');

//images
const image = require('gulp-image');

//icons
const svgSprite    = require('gulp-svg-sprite');
//const colorize = require('gulp-colorize-svgs');

//server
const browserSync = require('browser-sync').create();


/*
#############################################
---------------- functions ----------------
#############################################
*/

function moveFavicon(done){
	return pump([
		src(config.paths.assets+"favicon/favicon.ico"),
		dest(config.paths.build),
		notify("Move html files ✨")
	]);
	done();
}



/*
#########################################
clean project
#########################################
*/
function cleanProject(done){
	return del([config.paths.build+"*"], {force: true});	
}
/*
#########################################
make html
#########################################
*/
function makeHtml(done) {
	
	return pump([
        
			src(config.paths.pages, { base: './' }),
            plumber({
                handleError: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }),
			twig({
				data:{config},
				cache:false,
				debug:true,
				extend: twigMarkdown
			}).on('error', function (err) {
                process.stderr.write(err.message + '\n');
                this.emit('end');
            }),
			dest("../"),
			browserSync.stream()
		
	]);
 	done();	
   
};

/*
#########################################
make html prettify
#########################################
*/
function cleanHtml(done){
	return pump([
		src(config.paths.build + '*.html'),
	  	prettify({
		indent_size: 2,
		max_preserve_newlines: 1
	  	}),
	  	dest(config.paths.build),
		notify("clean html files ✨"),
		browserSync.stream()
	]);
	done();	
};

/*
#########################################
make css
#########################################
*/
function makeCss(done){
	
	return pump([
			
			
			src(config.paths.assets+"sass/*.scss"),
			sourcemaps.init(),
			sassGlob(),
			sass().on("error", sass.logError),
			minifyCSS(),
			sourcemaps.write(),
			dest(config.paths.build+'assets/css'),
			
			notify("build Css files 🎨"),
			browserSync.stream()
		
	]);
 	done();	
   
};



/*
#########################################
make js
#########################################
*/
function makeJs(done) {
  	return pump([
		src(config.paths.assets+"js/**/*.js"),
		jshint.reporter('default'),
		
		
		order([
			"assets/js/*.js",
			"assets/js/vendors/*.js",
			"assets/js/scripts/*.js"
		], { base: './' }),
		concat('main.js'),
		babel({presets: [['@babel/preset-env']]}),
		sourcemaps.init({loadMaps: true}),
		uglify({mangle: false}),

		sourcemaps.write(),
        dest(config.paths.build+'assets/js/'),
		notify("Build Javascript files 🎉."),
		browserSync.stream()
	
    ]);
 	done();	
 
};

/*
#########################################
images resize
#########################################
*/

function makeImg(done) {

	return pump([
			src(config.paths.assets+"images/"),
			image({
				pngquant: true,
				optipng: false,
				zopflipng: true,
				jpegRecompress: false,
				mozjpeg: true,
				gifsicle: true,
				svgo: true,
				concurrent: 10,
				quiet: true // defaults to false
			}),
			dest(config.paths.build+'assets/images/'),
			notify("Optimize & Copy images files to public folder 🎉")
	]);
 	done();
};


/*
#############################################
Svg
#############################################
*/
  
  function makeSvg(done) {
	return pump([
		src(config.paths.assets+"svgs/*.svg"),
	  	plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}),
	  	svgSprite({
			shape                 : {
			  dimension           : { // Set maximum dimensions
				maxWidth          : 64,
				maxHeight         : 64
			  },
			  dest                : 'unitaires' // Keep the intermediate files
			},
			mode                  : {
			  symbol              : { // Activate the «symbol» mode
				render            : {
				  css             : false, // CSS output option for icon sizing
				  scss            : false // SCSS output option for icon sizing
				},
				dest              : ".",
				sprite            : "icon-sprite.svg", // Sprite path and name
				example           : true // Build a sample page, please!
			  }
			},
			svg                   : {
			  doctypeDeclaration  : false,
			  dimensionAttributes : false
			}
		  }),
	  	dest(config.paths.build+'assets/svgs/'),
		notify("build svgs. 😍"),
		browserSync.stream()
	]);
	done();	
};

/*
#############################################
Svg to black
#############################################
*/
function makeSvgBlack(done) {
	return pump([	
		src(config.paths.assets+"svgs/*.svg"),
		plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}),
	  	colorize({
			colors: {
				default: {
					black: '000000'
				}	
			},
			replaceColor: function(content, hex) {
				return content.replace(/fill="#(.*?)"/g, 'fill="#' + hex + '"');
			},
			replacePath: function(path, colorKey) {
				return path.replace(/\.svg/, '--' + colorKey + '.svg');
			}
	  	}),
	  	dest(config.paths.build+'assets/svgs/black/'),
	  	notify("transform svg color to black. 😎"),
		browserSync.stream()
	]);
	done();

};  



function dev(cb) {
	
	browserSync.init({
		server: {baseDir: config.paths.build},open:true,notify:true
    });

    watch( config.paths.assets+"sass/**/*.scss", makeCss ).on('change', browserSync.reload);
	watch(config.paths.assets+"js/**/*.js", makeJs).on('change', browserSync.reload);
	watch(config.paths.assets+"images/", makeImg).on('change', browserSync.reload);
	watch(config.paths.assets+"svgs/", makeSvg).on('change', browserSync.reload);
	watch(config.paths.templates, series(makeHtml)).on('change', browserSync.reload); 
  	watch([config.paths.pages]).on('change', function(path, stats) {
	
		src(path)
			.pipe(
				
				twig({
					//base: "./tpls/",
					cache:false,
					debug:true
				}).on('error', function (err) {
					process.stderr.write(err.message + '\n');
					this.emit('end');
				})
			)
			.pipe(dest("../"));

			console.log(`File ${path} was changed`),
			notify(`Rebuild html -> ${path} was rebuild 🎉`),
			browserSync.stream();
		
  	});
}


/*
#############################################
tasks
#############################################
*/
exports.clean_project = cleanProject; //delete and rebuild
exports.clean_html = cleanHtml; //prettify html 
exports.make_html = makeHtml; //build html 
exports.make_css = makeCss; //build css
exports.make_js = makeJs; //build js
exports.make_img = makeImg; //build imgs
exports.make_svg = makeSvg; //build SVG
exports.make_svg_black = makeSvgBlack; // colorize svg to black
exports.move_favicon =moveFavicon;//move favicon ton build

//task default:
exports.default = series(cleanProject, parallel(makeHtml, makeCss, makeJs, makeImg, makeSvg,moveFavicon),cleanHtml, dev);


