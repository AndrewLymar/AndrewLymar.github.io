var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	autoprefixer = require('gulp-autoprefixer'),
	ftp = require('vinyl-ftp'),
	notify = require("gulp-notify"),
	rsync = require('gulp-rsync');

gulp.task('js', function () {
	return gulp.src([
		'src/libs/*.js',
		'src/js/data.js',
		'src/js/showData.js',
		'src/js/changeImage.js',
		'src/js/common.js'
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('src/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expand'
		}).on("error", notify.onError()))
		.pipe(rename({
			suffix: '.min',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 5 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function () {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'src/js/common.js'], ['js']);
	gulp.watch('src/*.html', browserSync.reload);
});

gulp.task('svg', function () {
	return gulp.src('src/img/icons/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "sprite.svg"
				}
			}
		}))
		.pipe(gulp.dest('src/img/icons/'))
		.pipe(gulp.dest('src/works/img/icons/'));
});

gulp.task('imagemin', function () {
	return gulp.src('src/img/**/*')
		// .pipe(cache(imagemin()))
		.pipe(imagemin())
		.pipe(gulp.dest('img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function () {

	var buildFiles = gulp.src([
		'src/*.html',
		'src/.htaccess',
		]).pipe(gulp.dest(''));

	var buildFiles = gulp.src([
		'src/works/**',
		]).pipe(gulp.dest('works'));

	var buildCss = gulp.src([
		'src/css/main.min.css',
		]).pipe(gulp.dest('css'));

	var buildJs = gulp.src([
		'src/js/scripts.min.js',
		]).pipe(gulp.dest('js'));

	var buildFonts = gulp.src([
		'src/fonts/**/*',
		]).pipe(gulp.dest('fonts'));

});

gulp.task('deploy', function () {

	var conn = ftp.create({
		host: 'hostname.com',
		user: 'username',
		password: 'userpassword',
		parallel: 10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {
			buffer: false
		})
		.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('rsync', function () {
	return gulp.src('dist/**')
		.pipe(rsync({
			root: 'dist/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// include: ['*.htaccess'],
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}));
});

gulp.task('removedist', function () {
	return del.sync('dist');
});
gulp.task('clearcache', function () {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
