import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rollNumber: '',
    department: '',
    session: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.rollNumber || !formData.department || !formData.session) {
      setErrorMsg('Please fill all the fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Password and Confirm Password do not match');
      return;
    }
    setErrorMsg(''); // Clear error message if validation passes

    fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json(); // Return the parsed JSON
      })
      .then((data) => {
        console.log('Form submitted successfully:', data);
        // Reset the form data after successful submission
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          rollNumber: '',
          department: '',
          session: ''
        });
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setErrorMsg('Error submitting form. Please try again.'); // Set error message for UI
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <>
      <form id='form' onSubmit={handleSubmit}>
        <div id='heading'><h1>Registration Form Student</h1></div>
        
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>} {/* Display error message */}

        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="Enter your name" name='name' value={formData.name} onChange={handleChange} />
        <br />
        
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Enter your email" name='email' value={formData.email} onChange={handleChange} />
        <br />
        
        <div className="password-container">
          <label htmlFor="password">Password:</label>
          <input type={showPassword ? "text" : "password"} placeholder="Enter your password" name='password' value={formData.password} onChange={handleChange} />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          <br />
          
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <br />
        
        <label htmlFor="roll-number">Roll-number:</label>
        <input type="text" placeholder="Enter your roll number" name='rollNumber' value={formData.rollNumber} onChange={handleChange} />
        <br />
        
        <label htmlFor="department">Department:</label>
        <input type="text" placeholder="Enter your department" name="department" value={formData.department} onChange={handleChange} />
        <br />
        
        <label htmlFor="session">Session:</label>
        <input type="number" placeholder="Enter your session" name="session" value={formData.session} onChange={handleChange} />
        <br />
        
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Form;
