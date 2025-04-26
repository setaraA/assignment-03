import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'; 

const app= express();

const PORT = 3000;

app.use (express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.set('view engine','ejs');


if(!fs.existsSync('images.jason')) fs.writeFileSync('images.jason', '[]');
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads');
    },
    filename:( req, file, cb) => {
        cb(null, Date.now() + path.extname
        (file.originalname ));
    }
});
const upload = multer ({storage: storage});




app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.redirect('/');
    } else {
        res.send('please upload an image');
    }
});

app.listen (PORT, () => {
    console.log('server is running ');
});



