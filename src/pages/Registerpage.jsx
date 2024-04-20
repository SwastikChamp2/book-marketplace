import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Registerpage.css"; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [pnum, setPnum] = useState("");
  const [role, setRole] = useState("buyer"); // Default to buyer

  // Seller-specific fields
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiMobileNumber, setUpiMobileNumber] = useState("");
  const [selfPickOption, setSelfPickOption] = useState(false);
  const [address, setAddress] = useState({
    firstLine: "",
    secondLine: "",
    streetName: "",
    landmark: "",
    district: "",
    city: "",
    state: "",
  });

  const handleGoogleSignUp = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      
      // Add additional logic here if needed
      
      console.log("User Signed Up with Google Successfully!!");
      toast.success("User Signed Up with Google Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        const userData = {
          email: user.email,
          name: fname,
          phonenumber: pnum,
          role: role,
        };

        if (role === "seller") {
          userData.bankAccountNumber = bankAccountNumber;
          userData.bankName = bankName;
          userData.ifscCode = ifscCode;
          userData.upiId = upiId;
          userData.upiMobileNumber = upiMobileNumber;
          userData.selfPickOption = selfPickOption;
          userData.address = address;
        }

        await setDoc(doc(db, "Users", user.uid), userData);
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="register-container">
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <button
        type="button"
        className="btn btn-danger"
        onClick={handleGoogleSignUp}
      >
        Sign Up with Google
      </button>

      <div className="mb-3">
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Full Name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Mobile Number</label>
        <input
          type="tel"
          className="form-control"
          placeholder="Mobile Number"
          onChange={(e) => setPnum(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Role</label>
        <select
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      {/* Seller-specific fields */}
      {role === "seller" && (
        <div>
          <div className="mb-3">
            <label>Bank Account Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bank Account Number"
              onChange={(e) => setBankAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Bank Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bank Name"
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>IFSC Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="IFSC Code"
              onChange={(e) => setIFSCCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>UPI ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="UPI ID"
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>UPI Mobile Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="UPI Mobile Number"
              onChange={(e) => setUpiMobileNumber(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="selfPickOption"
              onChange={(e) => setSelfPickOption(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="selfPickOption">
              Provide Self Pick Option
            </label>
          </div>
          {selfPickOption && (
            <div>
              <div className="mb-3">
                <label>First Line of Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Line of Address"
                  onChange={(e) =>
                    setAddress({ ...address, firstLine: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label>Second Line of Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Second Line of Address"
                  onChange={(e) =>
                    setAddress({ ...address, secondLine: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label>Street Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Street Name"
                  onChange={(e) =>
                    setAddress({ ...address, streetName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label>Landmark (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Landmark"
                  onChange={(e) =>
                    setAddress({ ...address, landmark: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label>District</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="District"
                  onChange={(e) =>
                    setAddress({ ...address, district: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
      
    </form>
    </div>
  );
}

export default Register;
