//Подключение gulp
var gulp = require('gulp');
//Объединение файлов
var concat = require('gulp-concat');
//Добавление префиксов
var autoprefixer = require('gulp-autoprefixer');
//Оптимизация стилей
var cleanCSS = require('gulp-clean-css');
//Оптимизация скриптов
var uglify = require('gulp-uglify');
//Удаление файлов
var del = require('del');
//Синхронизация с браузером
var browserSync = require('browser-sync').create();
//Для препроцессоров стилей
var sourcemaps = require('gulp-sourcemaps');
//Less препроцессор
var less = require('gulp-less');
//Модуль для сжатия изображений
var imagemin = require('gulp-imagemin');
//Модуль переменования файлов
var rename = require('gulp-rename');




//Порядок подключения less файлов
var styleFiles = [
  './src/css/normalize.less',
  './src/css/page.less',
  './src/css/variables.less',
  './src/css/font.less',
  './src/css/mixin.less',
  './src/css/main.less',
  './src/css/media.less'
]

//Порядок подключения js файлов
var scriptFiles = [
  './src/js/lib.js',
  './src/js/main.js'
]


//Таск для обработки стилей
gulp.task('styles', () => {
  //Шаблон для поиска файлов CSS
  //Всей файлы по шаблону './src/css/**/*.css'
  return gulp.src(styleFiles)
     .pipe(sourcemaps.init())
     //Указать stylus() , sass() или less()
     .pipe(less())
     //Объединение файлов в один
     .pipe(concat('style.css'))
     //Добавить префиксы
     .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
     }))
     //Минификация CSS
     .pipe(cleanCSS({
        level: 2
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(rename({
        suffix: '.min'
     }))
     //Выходная папка для стилей
     .pipe(gulp.dest('./build/css'))
     .pipe(browserSync.stream());
});


//Таск на скрипты JS
gulp.task('scripts', () => {
  //Шаблон для поиска файлов js
  //Все файлы по шаблону '/src/js/**/*.js'
  return gulp.src(scriptFiles)
  //Объединение файлов в один
  .pipe(concat('script.js'))
  //Минификация js
  .pipe(uglify({
    toplevel: true
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  //Выходная папка для скриптов
  .pipe(gulp.dest('./build/js'))
   .pipe(browserSync.stream());
});

//Удалить все в указанной папке
gulp.task('del', () => {
  return del(['build/*'])
});


gulp.task('img-compress', () => {
  return gulp.src('./src/img/**')
  .pipe(imagemin({
    progressive: true
  }))
  .pipe(gulp.dest('./build/img/'))
});


//Просматривать файлы
gulp.task('watch', () => {
  browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    //Слежка за CSS файлами
    gulp.watch('./src/css/**/*.less', gulp.series('styles'))
    //Следить за JS файлами
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
    //Запуск синхронизации при изменении HTML
    gulp.watch("./*.html").on('change', browserSync.reload);
});

//Таск по умолчанию, запускает del, styles, scripts, watch
gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));
