const { watch, series, src, dest } = require("gulp");
const postcss = require("gulp-postcss");
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const gulp = require('gulp');
const rename = require('gulp-rename');



// Task for compiling our CSS files using PostCSS
function cssTask(cb) {
    return src("./assets/main.css") // read .css files from ./src/ folder
        .pipe(postcss()) // compile using postcss
        .pipe(rename('style.css'))
        .pipe(dest("./")) // paste them in ./assets/css folder
    //.pipe(browserSync.stream());
    cb();
}

function scssTask(cb){
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/'))
    //.pipe(browserSync.stream());
    cb();
}


function indexMinifyjsTask2() {

    return src("./assets/js/slick/*.js", { allowEmpty: true })
        .pipe(minify({noSource: false}))
        .pipe(rename('slick.js'))
        .pipe(dest('./'))
    //.pipe(browserSync.stream());
    cb();
}
function indexMinifyjsTask() {

    return src("./assets/js/index.js", { allowEmpty: true })
        .pipe(minify({noSource: false}))
        .pipe(rename('main.js'))
        .pipe(dest('./'))
    //.pipe(browserSync.stream());
    cb();
}

// Watch Files & Reload browser after tasks
function watchTask() {
    watch(["./**/*.html", "./template-parts/*.php"]);
    watch(["./assets/js/index.js"], series(indexMinifyjsTask));
    watch(["./assets/js/slick/*.js"], series(indexMinifyjsTask2));
    watch(["./assets/scss/*.scss", "./assets/scss/**/*.scss"], series(scssTask,cssTask));
}

// Default Gulp Task
exports.default = series(indexMinifyjsTask,indexMinifyjsTask2 ,scssTask, cssTask, watchTask);
exports.css = cssTask;
