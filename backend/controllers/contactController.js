import Contact from "../models/Contact.js";

export const contactDisplay = async (req, res, next) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const contact = async (req, res, next) => {
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

export const deletecontact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(errorHandler(404, "Message not found!"));
  }

  try {
    await Contact.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
};


