import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    isLocal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
