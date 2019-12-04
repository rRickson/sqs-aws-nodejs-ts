var gulp = require("gulp");
var gulp_clean = require("gulp-clean");
var gulp_ts = require("gulp-typescript");

// pull in the project TypeScript config
var tsProject = gulp_ts.createProject("tsconfig.json");

gulp.task("scripts", function() {
  var tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest(tsProject.options.outDir));
});

gulp.task("clean-scripts", function () {
  return gulp.src((tsProject.options.outDir + "/**/*.js"), {read: false}).pipe(gulp_clean());
});

gulp.task("watch", ["clean-scripts", "scripts"], function() {
  gulp.watch(tsProject.config.include, ["scripts"]);
});

gulp.task("default", ["watch"]);

gulp.on('stop', () => { process.exit(0); });
