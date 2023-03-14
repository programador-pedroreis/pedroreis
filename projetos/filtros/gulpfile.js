const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


// Compilando o sass, adicionando autoprefixed e dando refresh na pagina
function compilaSass() {
  return gulp.src('assets/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('assets/css/'))
    .pipe(browserSync.stream());
}
// tarefa do sass
gulp.task('sass', compilaSass);


// Tarefas JavaScript
function gulpJs() {
  return gulp.src('assets/js/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(browserSync.stream());
}
gulp.task('mainjs', gulpJs);


// Função para iniciar o browser

//quando for WordPress
// function browser() {
//   browserSync.init({
//     proxy: 'server.local',
//   });
// }

//quando for WordPress Desabilitar
function browser() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}
//tarefa do browsersync
gulp.task('browser-sync', browser);

//funcao do watch para alteracoes 
function watch() {
  gulp.watch('./**/*.scss', compilaSass);



  gulp.watch(['*.html', './**/*.html']).on('change', browserSync.reload);

  gulp.watch(['*.php', './**/*.php']).on('change', browserSync.reload);

  gulp.watch('assets/js/scripts/**/*.js', gulpJs);

}
//tarefa do watch
gulp.task('watch', watch);

// tarefas default que executa o watch e o browsersync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));