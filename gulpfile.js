var
    gulp = require("gulp"),
    del = require("del"),
    sync = require("browser-sync").create(),
    plugins = require("gulp-load-plugins")({
        scope: ["devDependencies"]
    });

gulp.task("html", function () {
   return gulp.src("src/views/*.html")
       .pipe(plugins.htmlExtend())
       .pipe(gulp.dest("dist"))
});


gulp.task("styles:app", function () {
    return gulp.src("src/styles/app.less")
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.cssnano())
        .pipe(plugins.rename("app.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream())
});
gulp.task("img", function () {
    return gulp.src("src/img/*")
        .pipe(gulp.dest("dist/img"))
});

gulp.task("scripts:app", function () {
    return gulp.src("src/scripts/*")
        .pipe(plugins.concat("app.min.js"))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("dist/js"))
});

//**task for clean dist**//
gulp.task("del", function (callback) {
    del.sync("dist");
    callback();
});


gulp.task("build", ["del"],  function () {
    gulp.start(["html","styles:app","img", "scripts:app"]);
});


gulp.task("watch", ["build"], function () {
    sync.init({
        server: "dist"
    });
    gulp.watch("src/styles/**/*.less", ["styles:app"]);
    gulp.watch("src/views/**/*.html", ["html"]);
    gulp.watch("dist/*.html").on("change", sync.reload);
});

gulp.task("default", ["watch"]);