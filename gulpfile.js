var autoprefixer = require("gulp-autoprefixer");
var babelify = require("babelify");
var browserify = require("browserify");
var buffer = require("vinyl-buffer")
var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var source = require("vinyl-source-stream");
var uglify = require("gulp-uglify");

gulp.task("default", ["browserify", "sass", "watch"]);

gulp.task("browserify", function() {
  browserify("./app/assets/javascripts/main.jsx", { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function(error) {
      console.log("Error: " + error.message);
    })
    .pipe(source("./public/javascripts/main.js"))
    .pipe(buffer())
//    .pipe(uglify())
    .pipe(gulp.dest("./"));
});

gulp.task("sass", function() {
  sass("./app/assets/stylesheets/")
    .on("error", function(error) {
      console.log("Error: " + error.message);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest("./public/stylesheets"));
});

gulp.task("watch", function() {
  gulp.watch("./app/assets/javascripts/*", ["browserify"]);
  gulp.watch("./app/assets/stylesheets/*", ["sass"]);
});
