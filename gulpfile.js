(function() {
    "use strict";

    var gulp        = require("gulp"),
        sourcemaps  = require("gulp-sourcemaps"),
        livereload  = require("gulp-livereload"),
        notify      = require("gulp-notify"),
        plumber     = require("gulp-plumber"),
        ts          = require("gulp-typescript"),
        less        = require("gulp-less"),
        tscConfig   = require('./tsconfig.json'),
        concat      = require('gulp-concat');
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
                'typings/browser.d.ts'
            ])
            .pipe(sourcemaps.init())       
            .pipe(ts(tscConfig.compilerOptions))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest("app/build/js"))
    });
    
   
    gulp.task('copy:libs', function () {  
        return gulp.src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/zone.js/dist/**',
            'node_modules/reflect-metadata/temp/Reflect.js',
            'node_modules/rxjs/**',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/@angular/**'
            ], {base: './node_modules'})
            .pipe(gulp.dest('app/build.lib'))
    });

    gulp.task('watch', ['build'], function () {
        var watcher = gulp.watch("app/less/*.less", ['build-less']);
    });
    
    gulp.task('build', ['compile', 'build-less']);
    gulp.task('default', ['build']);

}());