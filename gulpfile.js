import { src, dest, series, parallel} from 'gulp';
import cleanCSS from 'gulp-clean-css';
import webserver from 'gulp-webserver';
import uglify from 'gulp-uglify';
import { mkdirSync, existsSync } from 'fs';

const outputCSS = 'public/css';

function ensureCssFolderExists() {
    if (!existsSync(outputCSS)) {
        mkdirSync(outputCSS, { recursive: true });
    }
}
function minJs(){
    return src('./src/**/*.js')
    .pipe(uglify({
        mangle: true
    }))
    .pipe(dest('./public/js'))
}

function minCss(){
    ensureCssFolderExists();
    return src('./*.css')
        .pipe(cleanCSS({
            debug: true
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest(outputCSS));
}

function initSever(){
    return src('public')
    .pipe(webserver({
        livereload: true,
        open: false,
        port: 8001
    }))  
}

function copyHtml(){
    return src('index.html')
    .pipe(dest('public'))
}

const tasksDev = series([parallel([minJs, minCss, copyHtml]), initSever]);

export default tasksDev;