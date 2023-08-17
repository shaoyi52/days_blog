//src: 读取文件对象相当于entry
//dest: 构建目标对象相当于output
//series: 用于编排任务顺序

const { src , dest, series } = require('gulp')//导入gulp的sass对象
var sass = require('gulp-sass')(require('sass'));;//导入sassGlob对象
var sassGlob = require('gulp-sass-glob');
//导入postcss对象
var postcss = require( 'gulp-postcss');
//导入兼容性前缀对象
var autoprefixer = require('autoprefixer');
//导入代码压缩对象
var cssnano = require('cssnano');

//创建任务函数
function scss(){
	//配置postcss的插件系统
    var plugins = [
        autoprefixer(),
        cssnano()
    ]
    //执行构建流
    return src('src/styles/*.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(postcss(plugins))
        .pipe(dest('lib/styles'));
      
}

exports.default = series(scss)