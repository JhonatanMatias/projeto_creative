//carregando plugins
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var pkg = require('./package.json');

//css Task

function css() {

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

	  	suffix: ".min"
	  }))
	  .pipe(cleanCSS())
	  .pipe(gulp.dest('./css'))
	  .pipe(browsersync.stream());

}


//js task

function js(){

	return gulp.src([

		 './js/*.js',
		 '!./js/*.min.js'
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


//browserSync
function browserSync(done) {

	browsersync.init({

		server: {

			baseDir: './'
		}
	})

	done();
}

//browserSync reload

function browserSyncReload(done){

	browsersync.reload();
	done();
}

//watch files
function watchFiles() {

	gulp.watch('./scss/**/*.scss',css);
	gulp.watch(["./js/**/*.js","!./js/*.min.js"], js);
	gulp.watch('./**/*.html',browserSyncReload);
}


gulp.task('default',gulp.parallel(css,js));

//dev task
gulp.task('dev',gulp.parallel(watchFiles,browserSync));




