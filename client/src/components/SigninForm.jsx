import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate
import './SigninForm.css';
const baseURI = import.meta.env.VITE_API_BASE_URL;

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();  // Initialiser useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseURI + 'api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);  // Stocker le token JWT
        setToken(data.token);  // Mettre à jour l'état avec le token
        setIsConnected(true);
      } else {
        setIsConnected(false);
        alert('Erreur lors de la connexion');
      }
    } catch (error) {
      setIsConnected(false);
      alert('Erreur réseau');
    }
  };

  useEffect(() => {
    if (isConnected) {
      alert(`Connexion réussie. Token: ${token}`);
      navigate('/dashboard');  // Rediriger vers la page d'accueil après connexion réussie
    }
  }, [isConnected, token, navigate]);  // Ajouter navigate comme dépendance

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default SigninForm;
