import { Schema, model } from "mongoose";

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    release_date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number, // Duration in minutes
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Movie = model("Movie", MovieSchema);

export default Movie;
