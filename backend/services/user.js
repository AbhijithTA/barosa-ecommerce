import Category from "../models/categories.js";
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
//login
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
    return res.status(403).json({ err: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch)
    return res.status(403).json({ err: "Password is Mismatched" });

  //generating access token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  //genertaing refresh token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  //set securely HTTPonly refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    message: "Login successful",
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
}

//===============================================================================================================================================================================//

//getting the category and subcategory
export async function get_category_subcategory(req, res) {
  const categories = await Category.find({}).populate("subCategory");

  return res.status(200).json({ categories });
}

//===============================================================================================================================================================================//

//Refresh token

export async function refreshToken(req, res) {
  try {
    //getting the token from cookies
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    //verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ error: "User not found or unauthorized" });
    }

    //creating new access token
    const newAccessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    //sending the new acces token
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error", err);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
}
