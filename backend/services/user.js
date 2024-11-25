import User from "../models/UserModal.js";
import { validateInputs } from "../validation/inputvalidation.js";

export const test = (req, res) => {
  res.send("Hello rom the test endpoint!");
};

//===============================================================================================================================================================================//

//register new user

export async function create_New_User(req, res) {
  const { name, email, password, phone } = req.body;

  const validationErrors = await validateInputs([
    [name, "name", "name"],
    [email, "email", "email"],
    [phone, "phone", "phone"],
  ]);

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  const userExists = await User.findOne({ email });
  if (userExists)
    return res
      .status(400)
      .json({ error: "User with the Email Already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    phone,
  };

  const user = await User.create(newUser);

  return res.status(200).json({ message: "User created successfully", user });
}

//===============================================================================================================================================================================//

export async function Login_User(req, res) {
  const { email, password } = req.body;

  const validationErrors = validateInputs([
    [email, "email", "email"],
    [password, "password", "password"],
  ]);

  if (Object.keys(validationErrors).length > 0)
    return res.status(400).json({ error: validationErrors });

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(403).json({ err: "No User Found for this Email" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch)
    return res.status(403).json({ err: "Password is Mismatched" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expires: "1h",
  });

  return res
    .status(200)
    .json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
}

//===============================================================================================================================================================================//
