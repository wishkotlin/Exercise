const execa = require('execa')
const fs = require('fs');
const path = require('path')

void async function () {
    await execa(
        './node_modules/.bin/parcel build -d dist/main ./*.html --public-url ./main --no-source-maps --no-cache --detailed-report --no-minify', {
        stdio: 'inherit'
    }
    )

    console.log('haha')

    const dirpath = path.join(__dirname, '/dist/main')
    fs.readdir(dirpath, function (err, files) {
        console.log(files, 'files')
        const htmlFiles = files.filter(el => /\.html$/.test(el))
        const cssFiles = files.filter(el => /\.css$/.test(el))
        cssFiles.forEach(item => {
            let content = fs.readFileSync(path.join(dirpath, item), { encoding: 'utf-8' })
            content = content.replace(/main\//g, "")
            // console.log(content, 'content')
            fs.writeFileSync(path.join(dirpath, item), content, {
                encoding: 'utf-8'
            })
            // fs.writeFileSync(path.join(__dirname, `/dist/${item}`), content, {
            //     encoding: 'utf-8'
            // })
        })
        htmlFiles.forEach(item => {
            let content = fs.readFileSync(path.join(dirpath, item), { encoding: 'utf-8' })
            content = content.replace(/main\//g, "./main/")
            // console.log(content, 'content')
            fs.writeFileSync(`${path.join(__dirname, `/dist/${item}`)}`, content, {
                encoding: 'utf-8'
            })
        })
        // do something with your files, by the way they are just filenames...
    })
}()


