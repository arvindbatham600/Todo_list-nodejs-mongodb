const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// console.log(date.getDate());
mongoose.connect('mongodb+srv://alex:arvind%40061282@cluster0.oep77.mongodb.net/todolistDB');

const ItemSchema = new mongoose.Schema({
	item:String
})
const Item = mongoose.model("Item",ItemSchema);
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

const item1 = new Item({
	item:"food"
})
const item2 = new Item({
	item:"book"
})
const item3 = new Item({
	item:"eat"
})	

const defalutArray = [item1, item2, item3];
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();
let Currunt = today.toLocaleDateString("en-US", options)
app.get("/", function(req, res){

	Item.find({},function(err,foundArray){
		// if(foundArray.length === 0){
		// 	Item.insertMany(defalutArray,function(err){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		else{
		// 			console.log("Successfully inserted defalut values");
		// 		}
		// 	})
		// 	res.redirect("/");
		// }
		// else{
		// 	res.render('list', {listTitle:Currunt, newItems:foundArray});
		// }

		if(err){
			console.log(err);
		}
		else{
			res.render('list', {listTitle:Currunt, newItems:foundArray});

		}
	})


	
});

app.post("/",(req,res) =>{

	let itemName = req.body.newListItem;
	const newItem = new Item({
		item:itemName
	})
	newItem.save();
	res.redirect("/");
})

app.post("/delete", (req,res) =>{
	const itemId = req.body.checkbox;
	Item.deleteOne({_id:itemId},function(err){
		if(err){
			console.log(err);
		}else{
			// console.log("succesfully delete");
	 res.redirect("/")

		}
	})
})


app.get("/about",(req,res) =>{
	res.render("about");
})




app.listen(3300, function(){
 	console.log("the server has started at port 3300");
});