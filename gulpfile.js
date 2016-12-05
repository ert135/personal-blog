(function() {
    "use strict";

    var gulp        = require("gulp"),
        sourcemaps  = require("gulp-sourcemaps"),
        livereload  = require("gulp-livereload"),
        plumber     = require("gulp-plumber"),
        ts          = require("gulp-typescript"),
        less        = require("gulp-less"),
        tscConfig   = require('./tsconfig.json'),
        concat      = require('gulp-concat'),
        flatten     = require('gulp-flatten');
        // config      = require('./gulp.config')(); 
        
    gulp.task("build-less", function () {
    console.log(concat);
        return gulp.src([
                "app/less/*.less"
            ])
            .pipe(less())
            .pipe(concat('styles.css'))
            .pipe(gulp.dest("app/build/css"))
    });
    
   gulp.task("compile", function () {
        return gulp.src([
                "app/components/*.ts",
                "app/components/**/*.ts",
                "app/**/**/*.ts",
                "app/**/*.ts",
                'typings/browser.d.ts'
            ])
            .pipe(sourcemaps.init())       
            .pipe(ts(tscConfig.compilerOptions))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest("app/build/js"))
    });

    gulp.task('watch', ['build'], function () {
        var watcher = gulp.watch(["app/less/*.less", "app/components/*.ts"], ['build-less', "compile"]);
    });
    
    gulp.task('build', ['compile', 'build-less']);
    gulp.task('default', ['build']);

}());