import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import crypto from "crypto"
import transporter from "../config/email.js";


//User register
export async function registerUser(req, res) {
    try {
        const { Name, Email, Password } = req.body;
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        let newUser = await User.create({
            Name,
            Email,
            Password: hashedPassword
        });
        res.status(200).json({
            message: "Registerd successfully"
        }

        )
    } catch (error) {
        console.log("error is", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

//Get all users
export async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-Password");
        res.status(200).json(users)
    }
    catch (error) {
        console.log("error is", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            })
        }
        const isPassword = await bcrypt.compare(Password, user.Password);
        if (!isPassword) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            })
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(200).json({
            message: "logined successfully",
            token
        })
    } catch (error) {
        console.log("error is", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
//User profile

export async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.userId).select("-Password")
        if (!user) {
            return res.status(404).json({
                message: "User Not found"
            })
        }
        return res.status(200).json({
            Name: user.Name,
            Email: user.Email
        })
    } catch (error) {
        console.log("error is", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
//User Update
export async function updateProfile(req, res) {
    try {
        const { Name } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "You aren't logged in"
            });
        }

        if (!Name || !Name.trim()) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { Name: Name.trim() },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            Name: user.Name,
            Email: user.Email
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
//Password Change
export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isPassword = await bcrypt.compare(currentPassword, user.Password);

        if (!isPassword) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            })
        }
        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.Password
        );

        if (isSamePassword) {
            return res.status(400).json({
                message: "New password cannot be the same as your current password"
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updated = await User.findByIdAndUpdate(
            req.userId,
            { Password: hashedPassword },
            { new: true }
        )
        res.status(200).json({
            message: "Password updated succesfully"
        })
    } catch (error) {
        console.log("error is", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
//Forgot Password
export async function forgotPassword(req, res) {
    try {
        const { Email } = req.body;
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(200).json({
                message: "If an account exists with this email, a reset link has been sent."
            })
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        const expiry = Date.now() + 15 * 60 * 1000;
        await User.findByIdAndUpdate(
            user._id,
            {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: expiry
            }
        );
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.Email,
            subject: "Reset your Shortex password",
            html: `
        <h2>Reset your Shortex password</h2>

        <p>You requested to reset your password.</p>

        <p>
            Click the button below to reset your password:
        </p>

        <a href="${resetLink}">
            Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

        <p>If you didn't request this, you can safely ignore this email.</p>
    `
        });

        return res.status(200).json({
            message: "If an account exists with this email, a reset link has been sent."
        });
    } catch (error) {
        console.log("error is", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
//Reset Password
export async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }
        if (!newPassword) {
            return res.status(400).json({
                message: "New password is required"
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }
        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.Password
        );

        if (isSamePassword) {
            return res.status(400).json({
                message: "New password cannot be the same as your old password"
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(
            user._id,
            {
                Password: hashedPassword,
                $unset: {
                    resetPasswordToken: 1,
                    resetPasswordExpires: 1
                }
            }
        );

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
//logout
export async function logoutUser(req, res) {
    try {
        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        console.log("error is", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}