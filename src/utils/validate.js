const validateEditProfileRequest = (req) => {
  const ALLOWED_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "about",
    "photoUrl",
    "about",
    "skills",
  ];

  return Object.keys(req.body).every((key) => key.includes(ALLOWED_FIELDS));
};

module.exports = {
  validateEditProfileRequest,
};
