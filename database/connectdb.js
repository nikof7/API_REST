import mongoose from 'mongoose'

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('Connect to DB ok 👌')
} catch (error) {
    console.log(`Error connectig to DB ${error}`)
}