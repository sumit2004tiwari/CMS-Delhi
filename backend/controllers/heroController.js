import HeroSection from "../models/HeroSection.js";
import asyncHandler from "express-async-handler";
import path from "path";
import fs from "fs";

// @desc    Get all hero sections
// @route   GET /api/hero-sections
// @access  Public
export const getHeroSections = asyncHandler(async (req, res) => {
  const heroSections = await HeroSection.find().sort({ order: 1 });

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const data = heroSections.map((h) => ({
    ...h.toObject(),
    image: h.image ? `${baseUrl}/${h.image}` : null, // ✅ full URL
  }));

  res.json(data);
});

// @desc    Create new hero section
// @route   POST /api/hero-sections
// @access  Private/Admin
export const createHeroSection = asyncHandler(async (req, res) => {
  const { title } = req.body;

  let imagePath = "";
  if (req.file) {
    imagePath = `uploads/images/${req.file.filename}`; // ✅
  }

  if (!title || !imagePath) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const heroSection = await HeroSection.create({
    title,
    image: imagePath
  });

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.status(201).json({
    ...heroSection.toObject(),
    image: `${baseUrl}/${imagePath}`,
  });
});

// @desc    Update hero section
// @route   PUT /api/hero-sections/:id
// @access  Private/Admin
export const updateHeroSection = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const heroSection = await HeroSection.findById(req.params.id);

  if (!heroSection) {
    res.status(404);
    throw new Error("Hero section not found");
  }

  heroSection.title = title || heroSection.title;
  if (req.file) {
    heroSection.image = path
      .join("uploads/images", req.file.filename)
      .replace(/\\/g, "/");
  }

  const updatedHeroSection = await heroSection.save();

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.json({
    ...updatedHeroSection.toObject(),
    image: `${baseUrl}/${updatedHeroSection.image}`,
  });
});

// @desc    Delete hero section
// @route   DELETE /api/hero-sections/:id
// @access  Private/Admin
export const deleteHeroSection = asyncHandler(async (req, res) => {
  const heroSection = await HeroSection.findById(req.params.id);

  if (!heroSection) {
    res.status(404);
    throw new Error("Hero section not found");
  }

  // Optional: delete the image file from uploads
  if (heroSection.image) {
    const imagePath = path.join(process.cwd(), heroSection.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete image file:", err);
    });
  }

  await heroSection.deleteOne();
  res.json({ message: "Hero section removed" });
});
