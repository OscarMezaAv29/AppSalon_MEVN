

function seedDB() {
    console.log('Desde seedDB');
}

function clearDB() {
    console.log('Desde clearDB');
}

if(process.argv[2] === '--import') {
    seedDB()
} else {
    clearDB()
}