import app from './app'

app.listen(app.get('port'));

console.log("listening to port: ",app.get('port'))