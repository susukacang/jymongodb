var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// connect to the database
// mongoose.connect('mongodb+srv://test:test@todo.pztll.mongodb.net/todo?retryWrites=true&w=majority')

mongoose.connect('mongodb+srv://test:test@todo.3wxjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

var todoSchema = new mongoose.Schema({
  item: String
})
var Todo = mongoose.model('Todo', todoSchema)
var itemOne = Todo({item: 'eat wonton mee'}).save(function(error){
  if(error) throw error
  console.log('item saved!!!')
})


mongoose.disconnect()

var data = []

var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send('YES')
  })

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body)
    res.json(data)
  });

  app.delete('/todo/:item', function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item
    })
    res.json(data)
  });
  
};