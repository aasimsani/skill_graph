import Button from 'react-bootstrap/Button';
import Navbar from '@components/Navbar';
import { useRouter } from "next/router"


function Home() {
  const router = useRouter();
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    router.push({ pathname: '/access', query: { page: 'signup' } })

  }
  return (
    <div>
      <Navbar />
      <div className='text-white h-1'>
        Hero Header text
      </div>
      <div className='text-white h-2'>
        Hero Sub-header text
      </div>
      <Button variant="warning" onClick={handleClick}>Get started</Button>
    </div>

  );
}

export default Home;