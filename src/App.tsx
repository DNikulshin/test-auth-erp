import { useState } from 'react'

import './App.css'

function App() {

    const [formData, setFormData] = useState<{ username: string; password: string, action: string }>({
      username: '',
      password: '',
      action: 'login'
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const data = new FormData();
      data.append('username', formData.username);
      data.append('password', formData.password);
      data.append('action', formData.action);
      
      try {
        const response = await fetch('https://erp.silinet.net/oper/', {
          method: 'POST',
          body: data,
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        console.log('Success:', result);
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
  
export default App
