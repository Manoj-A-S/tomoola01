import About from '../components/About';
import BookingForm from '../components/BookingForm';
import FolkDances from '../components/FolkDances';
import Hero from '../components/Hero';
import Vision from '../components/Vision';

export default function Home() {
  return (
    <>
      <Hero />
      <FolkDances />
      <About />
      <BookingForm />
      <Vision />
    </>
  );
}
