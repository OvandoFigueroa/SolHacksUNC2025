import { useNavigate } from 'react-router-dom';
import { CreateAccount } from './CreateAccount'; // Changed to named import

export default function CreateAccountWrapper() {
  const navigate = useNavigate();
  return <CreateAccount navigate={navigate} />;
}