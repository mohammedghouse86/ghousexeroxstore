const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser')
const Request = require('./models/requests'); // Adjust the path according to your file structure
var cors = require('cors')
const app = express();
const port = 7000;


// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Increase the limit if necessary
app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit if necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ghouseXeroxStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors())
app.use('/auth',require('./Routes/auth'))


// Route to handle file uploads
app.post('/upload', async (req, res) => {
  try {
    const { username, description, pdf } = req.body;

    // Decode the Base64 string back to a buffer
    const pdfBuffer = Buffer.from(pdf.split(',')[1], 'base64');
    const pdfContentType = pdf.split(',')[0].split(':')[1].split(';')[0];

    const newRequest = new Request({
      username,
      description,
      pdf: pdfBuffer,
      pdfContentType
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create request' });
    //console.log(error)
  }
});

// Route to retrieve and serve the PDF file
app.get('/requests/:id/pdf', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.set('Content-Type', request.pdfContentType);
    res.send(request.pdf);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve PDF' });
  }
});

app.listen(port, () => {
  //console.log(`Server running on port ${port}`);
});



// Route to retrieve and All requests
app.get('/fetchallrequests', async (req, res) => {
  try {
    // Use the find method to retrieve all documents from the 'requests' collection
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete a request and its PDF file
app.delete('/requests/:id', async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete request' });
  }
});
