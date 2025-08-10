import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    // description: {
    //   type: String,
    //   required: [true, 'Please add a description'],
    //   maxlength: [500, 'Description cannot be more than 500 characters'],
    // },
    image: {
      type: String,
      required: [true, 'Please add an image path'],
    },
    // order: {
    //   type: Number,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

export default mongoose.model('HeroSection', heroSectionSchema);
