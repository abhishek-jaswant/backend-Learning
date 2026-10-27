const express = require('express');
const app = express();
const port =  3000;
const redis = require('./config');
let  users = [
  { id: 1, name: "Abhishek", email: "abhishek@gmail.com" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com" }
];

app.use(express.json());  

app.get('/items', async (req, res) => {
    try {
      const data = await redis.get('users');
    

        if (!data) {
       await redis.set('users', JSON.stringify(users));
       return res.status(200).json({ message: 'User created successfully', users });
      }
      
      return res.status(200).json({ message: 'Users', users: JSON.parse(data) });
      
  }catch(err){
    return res.status(500).json({ message: 'Error creating user', error:err.message });
  }
   
});

app.post('/items', async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      let usersdata = await redis.get('users');
      usersdata = usersdata ? JSON.parse(usersdata) : [];
  
      const userexist = usersdata.find((item) => item.email === data.email);
      if (userexist) {
        return res.status(200).json({ message: 'User already exists', userexist });
      }

      usersdata.push(data);
     users = await redis.set('users', JSON.stringify(usersdata));
      
      return res.status(200).json({ message: 'User created successfully', users: usersdata });
 
   
  } catch (err) {
    
      
    return res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});


app.put('/items/:id', async (req, res) => {
  try {
    const data = req.body;
    const id =Number(req.params.id);
    let usersdata = await redis.get('users');
    usersdata = usersdata ? JSON.parse(usersdata) : [];

    const index = usersdata.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found'});
    }

    usersdata[index] = { ...usersdata[index], ...data };

   
    await redis.set('users', JSON.stringify(usersdata));
    
     return res.status(200).json({ message: 'User updated successfully', users: usersdata });
 
   
} catch (err) {
  
    
  return res.status(500).json({ message: 'Error updating user', error: err.message });
}
});

app.delete('/items/:id', async (req, res) => {
try {
  const id = Number(req.params.id);
  let usersdata = await redis.get('users');
  usersdata = usersdata ? JSON.parse(usersdata) : [];

  const index = usersdata.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }


   
      usersdata.splice(index, 1);
   
  
  
await redis.set('users', JSON.stringify(usersdata));
  
  return res.status(200).json({ message: 'User deleted successfully', users: usersdata });
} catch (err) {
  
  return res.status(500).json({ message: 'Error deleting user', error: err.message });
} 
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});