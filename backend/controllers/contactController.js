import Contact from "../models/Contact.js";

export const contactDisplay = async (req, res, next) => {
    try {
      const contact = await Contact.find();
      res.json(contact);
    } catch (error) {
      next(error);
    }
  };

 export const contact  = async (req, res, next) => {
    try {
      const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
  
      await newContact.save(); // Save contact data to MongoDB
  
      res
        .status(201)
        .json({ message: "Contact information submitted successfully!" });
    } catch (err) {
      next(err);
      res.status(500).json({ message: "Error submitting contact information" });
    }
  };