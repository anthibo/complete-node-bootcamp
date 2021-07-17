const fs = require('fs')
const superagent = require('superagent')

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file 😪');
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file 😐')
            resolve('Success')
        })
    })
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed:${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message);
        await writeFilePro('dog-img.txt', res.body.message)
        console.log('Random dog Image saved');

        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        // console.log(res.body.message);
        await writeFilePro('dog-img.txt', res.body.message)
        const all = await Promise.all([res1Pro, res2Pro, res3Pro])
        const imgs = all.map(el => el.body.message)
        console.log(imgs);

        await writeFilePro('dog-img.txt', res.body.message)
        console.log('Random dog Image saved');


        console.log(res.body.message);

        console.log('Random dog Image saved');

    }
    catch (err) {
        console.log(err.message);
        throw err
    }
    return '2: READY!'
}
console.log('1: Will get dog pics')
getDogPic().then(x => {
    console.log(x);
    console.log('3: Done');
}).catch(err => {
    console.log('error');
})





/*
readFilePro(`${__dirname}/dog.txt`).then(data => {

    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-image.txt', res.body.message)

}).then(() => console.log('Image Saved')).catch(err => {
    console.log(err.message);
}) */
