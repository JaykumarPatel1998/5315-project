import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("mongodb connected")
    app.listen(PORT, () => {
        console.log(`server running on http://${process.env.HOST}:${PORT}`);
    });
})
.catch(console.error)