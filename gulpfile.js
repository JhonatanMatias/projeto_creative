//Carregando os plugins
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json/');

//CSS task

function css(){

	return gulp.src('./scss/*.scss')
	  .pipe(plumber())
	  .pipe(sass({
	  	outputStyle: "expanded"
	  }))
	  .on('error',sass.logError)
	  .pipe(autoprefixer({

	  	browsers: ['last 2 versions'],
	  	cascade: false
	  }))
	  .pipe(gulp.dest('./css'))
	  .pipe(rename({

	  	suffix: 'min'
	  }))
	  .pipe(cleanCSS())
	  .pipe(gulp.dest('./css'))
	  .pipe(browsersync.stream());
}

//JS task

function js(){

	return gulp.src([
		'./js/*.js',
		'!./js/*.min.js',
		'!./js/jqBootstrapValidation.js'
		])
	  .pipe(uglify())
	  .pipe(rename({

	  	suffix: '.min'
	  }))
	  .pipe(gulp.dest('./js'))
	  .pipe(browsersync.stream());
}


//tasks

gulp.task('css',css);
gulp.task('js',js);


//BrowserSync

function browserSync(done) {

	browsersync.init({

		server: {

			baseDir: './'
		}
	});

	done();
}

//browserSync Reload
function browserSyncReload(done) {

	browsersync.reload();
	done();
}


//Watch files

function watchFiles(){

	gulp.watch('./scss/*.scss',gulp.series(css));
	gulp.watch(['./js/*.js','!./js/*.min.js'],gulp.series(js));
	gulp.watch('./**/*.html',gulp.series(browserSyncReload));
}


gulp.task('default',gulp.parallel(css,js));

//Dev tasks
gulp.task('dev',gulp.parallel(watchFiles,browserSync));



